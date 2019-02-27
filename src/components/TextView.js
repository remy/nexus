import React, { Component, createRef } from 'react';
import { getLink } from '../utils';

export default class TextView extends Component {
  constructor(props) {
    super(props);

    this.ref = createRef();
    this.state = { dirty: false };
  }

  getSelection = () => {
    const selection = window.getSelection();
  };

  update = firstTime => {
    const iframe = this.ref.current;
    const root = iframe.contentDocument.documentElement;
    root.setAttribute('spellCheck', 'false');
    iframe.contentDocument.designMode = 'on';
    const heightProp = firstTime ? 'scrollHeight' : 'offsetHeight';
    iframe.style.height = root[heightProp] + 1 + 'px';

    // if I don't use this additional timeout, there's a _tiny_ scroll in the frame
    setTimeout(() => {
      iframe.style.height = root[heightProp] + 1 + 'px';
    });
  };

  load = () => {
    this.update(true);
    const {
      contentDocument: document,
      contentWindow: window,
    } = this.ref.current;
    const root = document.documentElement;

    this.props.onHeight(window.outerHeight);

    // FIXME decide whether I need to remove this listener. I'm pretty sure I
    // don't since the iframe is removed and there's no closure I need to worry
    // about…
    root.addEventListener('input', () => {
      this.state.dirty && this.setState({ dirty: true });
      this.update();
    });

    root.addEventListener('dblclick', this.handleLinkClick);
  };

  componentDidMount() {
    this.ref.current.onload = this.load;
  }

  focus() {
    this.ref.current.focus();
  }

  handleLinkClick = e => {
    const { url, navigate } = this.props;
    const link = getLink(e.target, this.ref.current);

    console.log(link);

    if (link) {
      e.preventDefault();
      let navigateTo = link.href;

      // if we're a relative url, then rebase since we're hosting the html
      if (!link.getAttribute('href').startsWith('http')) {
        navigateTo = new URL(link.getAttribute('href'), url).toString();
      }
      navigate(navigateTo);
    }
  };

  render() {
    const { body } = this.props;

    return (
      <iframe
        width="100%"
        frameBorder="0"
        onKeyDown={event => {
          if (event.altKey && event.ctrlKey) event.preventDefault();
        }}
        ref={this.ref}
        srcDoc={`<link rel="stylesheet" href="/styles.5072464b.css"><html class="textview">${body}</html>`}
        onClick={e => e.preventDefault()}
      />
    );
  }
}
