import React, { Fragment, createRef } from 'react';
import Window from './Window';
import ErrorBoundary from './ErrorBoundary';
import { API } from '../env';
import { getLink, localToFilename } from '../utils';
import * as filesystem from '../filesystem';
import { PromptClose } from '../panels';
import './WebView.scss';
import { Search, SaveFile } from '../panels';

class WebView extends React.Component {
  constructor(props) {
    super(props);

    this.ref = createRef();
    this.editorRef = createRef();

    this.mark = null;

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

  componentWillUnmount() {
    // this.ref.current.parent.removeEventListener('selectstart', this.onSelect);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.body === this.state.body) {
      return;
    }

    // const parentNode = this.ref.current;

    // if (parentNode) {
    //   if (this.props.url.includes('#')) {
    //     const hash = this.props.url.replace(/^.*?#(.*$)/, '$1');
    //     try {
    //       this.scrollTo(hash);
    //     } catch (E) {
    //       // ignore
    //     }
    //   }

    //   // insert <br> elements in root level text nodes
    //   Array.from(parentNode.childNodes)
    //     .filter(_ => _.nodeName === '#text')
    //     .forEach(node => {
    //       const span = document.createElement('span');
    //       span.className = 'hash-text';
    //       parentNode.replaceChild(span, node);
    //       span.innerHTML = node.nodeValue.replace(/\n\n/g, '<br><br>');
    //     });
    // }
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
    if (json.body) {
      this.setState(json);
      if (json.isindex) {
        this.props.add({
          type: 'panel',
          id: 'search',
          Component: Search,
          isindex: json.isindex,
        });
      }
    } else {
      // it went wrong…
      this.setState({
        title: '500 error… 🔥',
        body: `<p><strong>Uh oh.</strong></p>\n\n<p>${JSON.stringify(
          json,
          0,
          2
        )}</p>`,
      });
    }
  }

  getRef() {
    return this.ref;
  }

  getReferrer() {
    return this.props.referrer;
  }

  unlink() {
    const selection = window.getSelection();
    const { anchorNode } = selection;

    const anchor = getLink(anchorNode, this.ref.current);

    if (anchor) {
      const node = document.createTextNode(anchor.innerText);
      anchor.parentNode.replaceChild(node, anchor);
      this.setState({ dirty: true });
    }
  }

  linkToMarked(url) {
    const selection = window.getSelection();
    const { anchorNode } = selection;

    const insideAnchor = getLink(anchorNode, this.ref.current, 'name');

    // if we're in a link, then just change the link url
    if (insideAnchor) {
      insideAnchor.href = url;
      return;
    }

    if (selection.isCollapsed === true) {
      // then select the current node and wrap the whole thing
      const range = document.createRange();
      selection.removeAllRanges();

      range.setStart(anchorNode, 0);
      range.setEnd(anchorNode, anchorNode.nodeValue.length);
      selection.addRange(range);
    }

    const anchor = document.createElement('a');
    anchor.setAttribute('href', url);
    anchor.innerHTML = this.replaceSelectionWith(anchor);

    // reselect the text
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNode(anchor.firstChild);
    selection.addRange(range);

    this.setState({ dirty: true });
  }

  applyStyle(style) {
    const selection = window.getSelection();
    let { anchorNode, anchorOffset } = selection;

    // if no anchor, we're not focused, so re-focus and re-call
    if (!anchorNode) {
      this.onFocus();
      return this.applyStyle(style);
    }

    const block = 'H1 H2 H3 H4 H5 H6 DIV P UL OL SECTION ARTICLE MAIN BODY'.split(
      ' '
    );

    // if we're a text node, then cycle up until we hit a block node and swap it
    if (anchorNode.nodeName === '#text') {
      do {
        anchorNode = anchorNode.parentNode;
        if (block.includes(anchorNode.nodeName)) {
          break;
        }
      } while (anchorNode !== this.ref.current);
    }

    const html = anchorNode.innerHTML;
    const node = document.createElement(style.tag.replace(/<(.*)>/, '$1'));

    node.innerHTML = html;
    anchorNode.parentNode.replaceChild(node, anchorNode);

    this.setState({ dirty: true });

    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNode(node.firstChild);

    if (!this.mark) {
      this.mark = {
        anchorNode: node,
        focusNode: node,
        anchorOffset,
        focusOffset: anchorOffset,
      };
    } else {
      this.mark.anchorNode = node;
      this.mark.focusNode = node;
    }

    // note: addRange comes last, because it triggers the focus event. Who knew?
    selection.addRange(range);
  }

  select = options => {
    const { anchorNode, focusNode, anchorOffset, focusOffset } = options;
    const [start, end] = [anchorOffset, focusOffset].sort((a, b) => a - b);
    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.setStart(anchorNode, start);
    range.setEnd(focusNode, end);
    selection.addRange(range);
    this.mark = {
      ...options,
      scrollTop: this.ref.current.parentNode.scrollTop,
    };
  };

  onFocus = () => {
    const { mark } = this;

    if (mark) {
      console.log('onFocus', mark);

      this.select(mark);
      this.ref.current.parentNode.scrollTop = mark.scrollTop;
      this.mark = null;
    }
  };

  onBlur = () => {
    const selection = window.getSelection();

    let { focusNode, focusOffset, anchorOffset, anchorNode } = selection;

    this.mark = {
      scrollTop: this.ref.current.parentNode.scrollTop,
      anchorNode,
      focusNode,
      anchorOffset,
      focusOffset,
    };
  };

  replaceSelectionWith(node) {
    const selection = window.getSelection();
    let { focusNode, focusOffset, anchorOffset, anchorNode } = selection;

    let text = '';
    let isText = false;

    if (anchorNode.nodeName !== '#text') {
      text = anchorNode.innerText;
    } else {
      text = anchorNode.nodeValue;
      isText = true;
    }

    let length = text.length;

    if (anchorNode.parentNode.nextSibling === focusNode && focusOffset === 0) {
      anchorNode.parentNode.replaceChild(node, anchorNode);
    } else if (anchorNode === focusNode) {
      // within a single text node
      const [min, max] = [anchorOffset, focusOffset].sort((a, b) => a - b);
      if (min === 0 && max === text.length) {
        anchorNode.parentNode.replaceChild(node, anchorNode);
      } else {
        text = text.substring(min, max);
        let middle;

        if (isText) {
          middle = anchorNode.splitText(min);
          if (max < length) {
            middle.splitText(max - min);
          }
        } else {
          middle = anchorNode.firstChild;
        }
        middle.parentNode.replaceChild(node, middle);
      }
    } else {
      anchorNode.parentNode.replaceChild(node, anchorNode);
    }

    return text;
  }

  onMark() {
    const selection = window.getSelection();
    let { anchorNode } = selection;

    if (selection.rangeCount > 0 && selection.isCollapsed === false) {
      const { nextId } = this.state;

      // TODO check if anchorNode is inside of a <A NAME> if so, return that instead
      const insideAnchor = getLink(anchorNode, this.ref.current, 'name');

      if (insideAnchor) {
        return { url: this.props.url + '#' + insideAnchor.hash };
      }

      const anchor = document.createElement('a');
      anchor.setAttribute('NAME', nextId);
      anchor.innerHTML = this.replaceSelectionWith(anchor);

      const nextIdElement = this.ref.current.querySelector('nextid');
      if (nextIdElement) {
        try {
          nextIdElement.removeAttribute(nextId);
        } catch (e) {
          // noop
        }
        nextIdElement.setAttribute('n', nextId + 1);
      }

      this.setState({ dirty: true, nextId: nextId + 1 });
      this.mark = null;

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
    const { links } = this.state;
    if (url) {
      let index = links.indexOf(url);
      if (index === 0) index = 1;
      return links[index - 1];
    }

    // if no url, call to the parent
    const { referrer } = this.props;

    if (referrer && referrer.current) {
      return referrer.current.previous(this.props.url);
    }
  };

  handleClose = () => {
    if (this.state.dirty) {
      this.setState({ showPrompt: true });
      return;
    }
    this.props.onClose(this.props.id);
  };

  handlePromptSubmit = async ({ value }) => {
    this.setState({ showPrompt: false });
    if (value === null) {
      return; // do nothing
    }

    if (value === false) {
      this.props.onClose(this.props.id);
      return;
    }

    await this.save();
    this.props.close(this.props.id);
  };

  setFilename = filename => {
    this.filename = filename;
  };

  getFilename = () => {
    return localToFilename(this.filename || this.props.id);
  };

  save = async force => {
    if (!force && !this.state.local) {
      this.props.add({
        type: 'panel',
        id: 'save-file',
        Component: SaveFile,
        body: this.ref.current.innerHTML,
        ref: { current: this },
      });
      return;
    }

    await filesystem.save(this.getFilename(), this.ref.current.innerHTML);
    this.setClean();
  };

  render() {
    const { onFocus, ...props } = this.props;

    const { title, body, dirty, showPrompt } = this.state;

    if (!body) {
      return (
        <Window className="window-webview" title="Connecting..." {...props}>
          <div className="webview">
            <div className="r2l-content">
              <div style={{ height: '400px' }}>&nbsp;</div>
            </div>
          </div>
        </Window>
      );
    }

    if (this.state.hasError) {
      return <p>It went wrong {this.state.error}</p>;
    }

    return (
      <Fragment>
        {showPrompt && (
          <PromptClose
            onSubmit={this.handlePromptSubmit}
            add={this.props.add}
            close={this.props.close}
            text={`Save changes to '${title}'?`}
          />
        )}
        <Window
          onStop={() => {
            // stops being dragged
            this.ref.current.focus();
          }}
          className="window-webview"
          title={title || this.state.base}
          onFocus={onFocus}
          dirty={dirty}
          {...props}
          onClose={this.handleClose}
        >
          <div className="webview">
            <div className="r2l-content">
              <div
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                onKeyDown={event => {
                  if (event.altKey && event.ctrlKey) event.preventDefault();
                }}
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
      </Fragment>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <ErrorBoundary {...props}>
    <WebView {...props} ref={ref} />
  </ErrorBoundary>
));
