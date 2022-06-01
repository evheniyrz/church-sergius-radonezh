import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  public editor: Editor;
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  public colorPresets: string[] = [
    '#CD5C5C', '#F08080', '#FA8072', '#E9967A', '#FFA07A', '#DC143C', '#FF0000', '#B22222', '#8B0000',
    '#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#DA70D6', '#FF00FF', '#BA55D3', '#9370DB', '#8A2BE2', '#9400D3', '#9932CC', '#800080', '#663399', '#4B0082', '#7B68EE', '#6A5ACD', '#483D8B',
    '#DCDCDC', '#D3D3D3', '#C0C0C0', '#A9A9A9', '#808080', '#696969', '#778899', '#708090', '#2F4F4F', '#000000',
    '#ADFF2F', '#7FFF00', '#00FF00', '#32CD32', '#98FB98', '#90EE90', '#00FA9A', '#00FF7F', '#3CB371', '#2E8B57', '#228B22', '#008000', '#006400',
    '#4682B4', '#B0C4DE', '#ADD8E6', '#87CEEB', '#00BFFF', '#1E90FF', '#6495ED', '#4169E1', '#0000FF', '#00008B', '#191970',
    '#D2B48C', '#BC8F8F', '#F4A460', '#DAA520', '#B8860B', '#CD853F', '#D2691E', '#8B4513', '#A0522D', '#A52A2A', '#800000',
    '#FFFFFF', '#FFFAFA', '#F0FFF0', '#F5FFFA', '#F0FFFF', '#F8F8FF', '#F5F5F5', '#FFF5EE', '#F5F5DC', '#FFFAF0', '#FFFFF0', '#FAEBD7', '#FFE4E1',
    '#FFD700', '#FFFF00', '#FFFFE0', '#BDB76B', '#FFFACD', '#FFEFD5', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C'
  ];

  public editorForm: FormGroup;
  public imgUrlSelect: FormControl = new FormControl('');

  constructor(private fb: FormBuilder) {
    this.editor = new Editor();
    // this.editor.setContent(value);
    // const html = toHTML(this.jsonDoc);
    // this.jsonDoc = toDOC(htmlString);
    this.editorForm = this.fb.group(
      {
        editorContent: this.fb.control('', Validators.required())
      }
    );
  }

  ngOnInit(): void {
  }

  public getContent(): void {
    if (null != this.editorForm && this.editorForm.valid) {
      console.log('CONTENT_VAL', this.editorForm.value)
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}