// base class used for forms to deal with unloading resources.
// when the before the page gets unloaded we need to call the dispose function to clean up memory.

export class ViewModelBase {
    constructor() {
        this.disposeHandler = this.dispose.bind(this);
        addEventListener('beforeunload', this.disposeHandler);
    }

    dispose() {
        removeEventListener('beforeunload', this.disposeHandler);
        this.disposeHandler = null;
        window.viewModel = null;
    }
}