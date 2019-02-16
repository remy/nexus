import React from 'react';
import Window from './Window';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      const title = 'Something went wrong :-\\';
      return (
        <Window {...this.props} title={title} dialogue>
          <div className="help-dialogue">
            <p>
              Hopefully this cryptic message will help those clever boffins work
              out exactly what went wrong…maybe.
            </p>
            <hr />
            <p>{this.state.error.message}</p>
          </div>
        </Window>
      );
    }

    return this.props.children;
  }
}
