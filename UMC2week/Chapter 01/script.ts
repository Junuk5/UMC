import { convertCompilerOptionsFromJson } from "typescript";

// 1. HTML 요소 선택 (핸드북 자바스크립트 편 참고)
const todoinput = document.getElementById('todo-input') as HTMLInputElement;  //타입안정성
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 2. 할 일이 어떻게 생긴애인지 Type 정의
type Todo = {
    id: number;
    text: string;
};
    // 안의 요소는 todo인데 배열 형태를 따른다 [{id: 1, text: '123'}]
let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// - 할 일 목록 렌더링 하는 함수를 정의

const renderTasks = (): void => {
    todoList.innerHTML ='';
    doneList.innerHTML ='';    

    todos.forEach((todo): void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo): void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });

};

// 3. 할 일 텍스트 입력 처리 함수. (공백 잘라줌)
const getTodoText = (): string => {
    return todoinput.value.trim();
};

// 4. 할 일 추가 처리 함수

const addTodo = (text: string) : void => {
    todos.push({id:Date.now(), text}) // 자바스크립트는 같으면 키랑 value 가 생략가능
    todoinput.value ='';
    renderTasks();
};

// 5. 할 일 상태 변경 (완료로 이동)

const completeTodo = (todo: Todo) :void => {
    todos = todos.filter((t): boolean => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};

// 6. 완료된 할 일 삭제 함수
const deleteTodo = (todo:Todo) : void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
    renderTasks();
}

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)

const createTodoElement = (todo:Todo, isDone: boolean) => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;
    
    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    } else{
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
    }

    button.addEventListener('click', (): void => {
        if(isDone) {
            deleteTodo(todo);
        } else {
            completeTodo(todo);
        }
    });
    
    li.appendChild(button);
    return li;
};



// <ul id="todo-list" class="render-container-list">
//     <li class="render-container__item">
//         <p class="render-container-item-text">123</p>
//         <button class="render-container__item-button">삭제</button>
//     </li>
// </ul>



// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault();//초기화 방지
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTasks();