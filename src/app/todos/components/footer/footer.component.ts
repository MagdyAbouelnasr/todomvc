import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>
  filter$: Observable<FilterEnum>
  filterEnum = FilterEnum

  constructor(private todoService: TodosService) {
    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount)=> `item${activeCount != 1? 's' : ''} left`)
    )

    this.noTodosClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    this.filter$ = this.todoService.filter$
  }

  changeFilter(event: Event, filterName: FilterEnum):void {
    event.preventDefault();
    // this.todoService.filter$.next()
    this.todoService.changeFilter(filterName)
  }
}
