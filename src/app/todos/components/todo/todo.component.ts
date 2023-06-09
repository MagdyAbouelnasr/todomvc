import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit, OnChanges{

  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEitingIdEvent: EventEmitter<string | null> = new EventEmitter();

  editingText: string = ''
  @ViewChild('textInput') textInput!: ElementRef

  constructor(private todoService: TodosService){
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  ngOnInit(): void {
      this.editingText = this.todoProps.text
  }

//   ngOnChanges(changes: SimpleChanges) {
//     console.log('changes', changes);
//     if (changes.isEditingProps.currentValue) {
//       setTimeout(() => {
//         this.textInput.nativeElement.focus();
//       }, 0);
//     }
//   }
// }

  setTodoInEditMode(){
    this.setEitingIdEvent.emit(this.todoProps.id)
  }

  removeTodo():void{
      this.todoService.removeTodo(this.todoProps.id)
  }

  toggleTodo():void{
      this.todoService.toggleTodo(this.todoProps.id)
  }

  changeText(event: Event): void{
      const value = (event.target as HTMLInputElement).value;
      this.editingText = value
  }

  changeTodo():void{

    this.todoService.changeTodo(this.todoProps.id, this.editingText)
    this.setEitingIdEvent.emit(null)
  }
}
