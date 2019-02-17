import React, { createRef } from 'react';
import Window from './Window';
import ErrorBoundary from './ErrorBoundary';
import { API } from '../env';
import { getLink, localToFilename } from '../utils';
import * as filesystem from '../filesystem';
import './WebView.scss';

class WebView extends React.Component {
  constructor(props) {
    super(props);

    this.ref = createRef();

    this.state = {
      title: '',
      body: '',
      local: false,
      links: [],
      dirty: false,
      nextId: 0,
      hasError: false,
      error: null,
    };
  }

  scrollTo = hash => {
    const parentNode = this.ref.current;
    let target = parentNode.querySelector(`a[name="${hash}"]`);

    if (!target) {
      target = parentNode.querySelector(`#${hash}`);
    }

    if (target) {
      target.scrollIntoView();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.body === this.state.body) {
      return;
    }

    const parentNode = this.ref.current;
    // insert <br> elements in root level text nodes
    if (parentNode) {
      // const links = Array.from(parentNode.querySelectorAll('a'), link => {
      //   return link.href;
      // }).filter(_ => {
      //   return _.trim() && _.startsWith('http');
      // });

      // this.setState({ links });

      if (this.props.url.includes('#')) {
        const hash = this.props.url.replace(/^.*?#(.*$)/, '$1');
        this.scrollTo(hash);
      }

      Array.from(parentNode.childNodes)
        .filter(_ => _.nodeName === '#text')
        .forEach(node => {
          const span = document.createElement('span');
          span.className = 'hash-text';
          parentNode.replaceChild(span, node);
          span.innerHTML = node.nodeValue.replace(/\n\n/g, '<br><br>');
        });
    }
  }

  componentDidMount() {
    this.load(this.props.url);
  }

  setClean() {
    this.setState({ dirty: false });
  }

  async load(url) {
    if (url.startsWith('file://')) {
      const filename = localToFilename(url);

      const title = filename.replace(/\.html?$/, '');
      const body = await filesystem.load(filename);
      this.setState({
        local: true,
        title,
        body,
      });
      return;
    }
    const res = await fetch(`${API}?url=${encodeURIComponent(url)}`);
    const json = await res.json();
    if (json.title) {
      this.setState(json);
    } else {
      // it went wrong…
      this.setState({ title: '500 error… 🔥' });
    }
  }

  getRef() {
    return this.ref;
  }

  getReferrer() {
    return this.props.referrer;
  }

  unlink() {
    const { local } = this.state;
    // only local files can be modified for marking
    if (!local) {
      return;
    }
    const selection = window.getSelection();

    // BUG only supports unlinking a single link - come on, we had 5 days!
    if (selection.anchorNode.nodeName === '#text') {
      const { anchorNode } = selection;

      const parent = getLink(anchorNode);
      const node = document.createTextNode(anchorNode.nodeValue);

      parent.parentNode.replaceChild(node, parent);
      this.setState({ dirty: true });
    }
  }

  linkToMarked(url) {
    const { local } = this.state;
    // only local files can be modified for marking
    if (!local) {
      return;
    }
    const selection = window.getSelection();

    // we assume this is nearly always… I think
    if (selection.anchorNode.nodeName === '#text') {
      const nextId = this.state.nextId;
      this.setState({ nextId: nextId + 1 });
      const { anchorOffset, focusOffset, anchorNode } = selection;
      const [start, end] = [focusOffset, anchorOffset].sort();

      const parent = anchorNode.parentNode;
      const text = anchorNode.nodeValue;
      const linkText = selection.toString();

      const left = document.createTextNode(text.substr(0, start));
      const right = document.createTextNode(text.substr(end));
      const middle = document.createElement('a');
      middle.setAttribute('NAME', nextId);
      middle.setAttribute('href', url);
      middle.innerHTML = linkText;

      parent.replaceChild(right, anchorNode);
      parent.insertBefore(middle, right);
      parent.insertBefore(left, middle);

      // reselect the highlighted block
      let range = document.createRange();
      selection.removeAllRanges();
      range.selectNode(middle);
      selection.addRange(range);

      const nextIdElement = this.ref.current.querySelector('nextid');
      if (nextIdElement) {
        // TODO workout how to set a numeric attrib…apparently it won't fly
      }

      this.setState({ dirty: true });

      return { url: this.props.url + '#' + nextId };
    }
  }

  applyStyle(style) {
    const { local } = this.state;
    // only local files can be modified for marking
    if (!local) {
      return;
    }
    const selection = window.getSelection();

    // we assume this is nearly always… I think
    if (selection.anchorNode.nodeName === '#text') {
      const { anchorNode, focusNode } = selection;

      const html = anchorNode.innerHTML;
      const node = document.createAttribute(style.tag.replace(/<(.*)>/, '$1'));

      this.ref.current.replaceChild(node, focusNode);
      node.innerHTML = html;

      this.setState({ dirty: true });
    }
  }

  onMark() {
    const { local } = this.state;
    // only local files can be modified for marking
    if (!local) {
      return;
    }
    const selection = window.getSelection();

    // we assume this is nearly always… I think
    if (selection.anchorNode.nodeName === '#text') {
      const nextId = this.state.nextId;
      this.setState({ nextId: nextId + 1 });
      const { anchorOffset, focusOffset, anchorNode } = selection;
      const parent = anchorNode.parentNode;
      const text = anchorNode.nodeValue;
      const linkText = selection.toString();

      const left = document.createTextNode(text.substr(0, focusOffset));
      const right = document.createTextNode(text.substr(anchorOffset));
      const middle = document.createElement('a');
      middle.setAttribute('NAME', nextId);
      middle.innerHTML = linkText;

      parent.replaceChild(right, anchorNode);
      parent.insertBefore(middle, right);
      parent.insertBefore(left, middle);

      // reselect the highlighted block
      let range = document.createRange();
      selection.removeAllRanges();
      range.selectNode(middle);
      selection.addRange(range);

      const nextIdElement = this.ref.current.querySelector('nextid');
      if (nextIdElement) {
        // TODO workout how to set a numeric attrib…apparently it won't fly
      }

      this.setState({ dirty: true });

      return { url: this.props.url + '#' + nextId };
    }
  }

  visitUrl = e => {
    const { url, onNavigate } = this.props;
    const link = getLink(e.target, this.ref.current);
    if (link) {
      e.preventDefault();
      let navigateTo = link.href;

      // if we're a relative url, then rebase since we're hosting the html
      if (!link.getAttribute('href').startsWith('http')) {
        navigateTo = new URL(link.getAttribute('href'), url).toString();
      }
      onNavigate(navigateTo);
    }
  };

  next = url => {
    const { links } = this.state;
    if (url) {
      let index = links.indexOf(url);
      if (!links[index + 1]) index--;
      return links[index + 1];
    }

    // if no url, call to the parent
    const { referrer } = this.props;

    if (referrer && referrer.current) {
      return referrer.current.next(this.props.url);
    }
  };

  previous = url => {
    if (url) {
      let index = this.state.links.indexOf(url);
      if (index === 0) index = 1;
      return this.state.links[index - 1];
    }

    // if no url, call to the parent
    const { referrer } = this.props;

    if (referrer && referrer.current) {
      return referrer.current.previous(this.props.url);
    }
  };

  render() {
    const { onFocus, ...props } = this.props;

    const { title, body, dirty } = this.state;

    if (!body) {
      return <Window title={title} {...props} />;
    }

    if (this.state.hasError) {
      return <p>It went wrong {this.state.error}</p>;
    }

    return (
      <Window title={title} onFocus={onFocus} dirty={dirty} {...props}>
        <div className="webview">
          <div className="r2l-content">
            <div
              onInput={() => {
                !dirty && this.setState({ dirty: true });
              }}
              ref={this.ref}
              className="l2r-content content"
              contentEditable={true}
              dangerouslySetInnerHTML={{ __html: body }}
              spellCheck={false}
              onMouseDown={() => onFocus()}
              onClick={e => e.preventDefault()}
              onDoubleClick={this.visitUrl}
            />
          </div>
          <button className="grab-window">Grab the window</button>
        </div>
      </Window>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <ErrorBoundary {...props}>
    <WebView {...props} ref={ref} />
  </ErrorBoundary>
));
