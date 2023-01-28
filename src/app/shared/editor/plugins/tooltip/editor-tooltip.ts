import { NodeSelection, EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export class SelectionSizeTooltip {
  tooltip!: HTMLSpanElement;
  constructor(private view: EditorView) {
    this.tooltip = document.createElement("span");
    this.tooltip.id = "editorTooltip";
    this.tooltip.style.position = 'absolute';
    this.tooltip.style.backgroundColor = 'rgb(214 214 214)';
    this.tooltip.style.color = 'rgb(100 149 237)';
    this.tooltip.style.fontSize = '18px';
    this.tooltip.style.fontWeight = '500';
    this.tooltip.style.padding = '5px';
    this.tooltip.style.borderRadius = '5px';
    this.view.dom.parentNode!.appendChild(this.tooltip);

    this.update(view, null);
  }

  update(view: EditorView, lastState: EditorState | null) {
    const state = view.state;

    if (lastState && lastState.doc.eq(state.doc) &&
      lastState.selection.eq(state.selection)) return

    // Hide the tooltip if the selection is empty
    if (state.selection.empty || (!(state.selection instanceof NodeSelection) &&
      (state.selection as NodeSelection).node?.type.name !== 'image')) {
      this.tooltip.style.display = "none"
      return
    }

    const selection: NodeSelection = state.selection as NodeSelection;
    // Otherwise, reposition it and update its content
    this.tooltip.style.display = "inline-block";

    const extendedView: EditorView & { lastSelectedViewDesc: any } = view as EditorView & { lastSelectedViewDesc: any };

    const offH = extendedView.lastSelectedViewDesc.dom.offsetHeight;
    const offL = extendedView.lastSelectedViewDesc.dom.offsetLeft;
    const offT = extendedView.lastSelectedViewDesc.dom.offsetTop;
    const offW = extendedView.lastSelectedViewDesc.dom.offsetWidth;

    const left = offL;
    this.tooltip.style.left = left + "px";
    this.tooltip.style.top = (offT - 20) + "px";
    this.tooltip.textContent = `Image width: ${offW - 2}`;
  }

  destroy() { this.tooltip.remove() }
}
