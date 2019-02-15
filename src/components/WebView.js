import React, { createRef } from 'react';
import Window from './Window';
import { HOST, API } from '../env';
import { getLink } from '../utils';
import './WebView.scss';

export default class WebView extends React.Component {
  constructor(props) {
    super(props);

    this.ref = createRef();

    this.state = {
      title: '',
      body: '',
      links: [],
      dirty: false,
      nextId: 0,
    };
  }

  componentDidUpdate() {
    const parent = this.ref.current;
    // insert <br> elements in root level text nodes
    if (parent) {
      Array.from(parent.childNodes)
        .filter(_ => _.nodeName === '#text')
        .forEach(node => {
          const span = document.createElement('span');
          span.className = 'hash-text';
          parent.replaceChild(span, node);
          span.innerHTML = node.nodeValue.replace(/\n\n/g, '<br><br>');
        });
    }
  }

  componentDidMount() {
    this.load(this.props.url);
  }

  async load(url) {
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

  unlink() {
    const { local } = this.props;
    // only local files can be modified for marking
    if (!local) {
      // return;
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
    const { local } = this.props;
    // only local files can be modified for marking
    if (!local) {
      // return;
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

  onMark() {
    const { local } = this.props;
    // only local files can be modified for marking
    if (!local) {
      // return;
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

      const left = document.createTextNode(text.substr(0, anchorOffset));
      const right = document.createTextNode(text.substr(focusOffset));
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

  render() {
    const { url, onNavigate, onFocus, ...props } = this.props;

    const { title, body, dirty } = this.state;

    if (!url) {
      return <Window title={title} {...props} />;
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
              onDoubleClick={e => {
                const link = getLink(e.target, this.ref.current);
                if (link) {
                  e.preventDefault();
                  let navigateTo = link.href;

                  // if we're a relative url, then rebase since we're hosting the html
                  if (link.origin === HOST) {
                    navigateTo = new URL(
                      link.getAttribute('href'),
                      url
                    ).toString();
                  }
                  onNavigate(navigateTo);
                }
              }}
            />
          </div>
          <button className="grab-window">Grab the window</button>
        </div>
      </Window>
    );
  }
}
