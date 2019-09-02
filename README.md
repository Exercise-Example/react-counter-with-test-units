#  React簡易元件測試功能



![螢幕快照 2019-09-02 下午9.08.28](https://i.imgur.com/Rm0ci1U.png)

[Demo 範例](https://codesandbox.io/s/github/React-Learing/react-counter-with-test-units)

單元測試可以讓你的code更嚴謹，在未來擴充功能的時候也比較不會改一個壞一個地方找不到原因，不囉唆，那我們來看看要怎麼在React裡面做單元測試吧！

我們一樣拿前面的計時器的功能來看看，也可以從這個範例開始跟著改起。

[進階者的React-Redux範例](https://medium.com/tomsnote/進階者的react-redux範例-c6b3d548b1a1)



其實如果使用 create react app 來建立的專案的話裡面已經有單元測試的套件了，不過我們還是需要自己手動安裝下面套件

> `yarn add mocha`
>
> `Yarn add enzyme`
>
> `yarn add expect`
>
> `yarn add enzyme-adapter-react-16`
>
> `yarn add jsdom`

接著在src的資料夾下建立test的資料夾來放我們個格元件的測試腳本

`src/test`

那就讓我們看下去怎麼做吧～

## Action測試

在Action的時候滿簡單的，判斷個別function啟動時候是否有回傳對應的action type。用expect的斷言的方式達成就可以。

首先在引入的時候先引入`expect`還有想要測試的action。主要的寫法如下:

第一個describe後面的'action'代表測試的總類，第二個包起的describe代表測試的元件，接著裡面的it為大的測試元件的子測試功能。可以寫很多個，裡面打的字可以寫清楚想要測試的東西是什麼。

```js
import expect from 'expect';
import * as actions from '../../actions';

describe('actions', () => {
  describe('counter', () => {
    it('increment should create increment action', () => {
      //.....把你想測試的東西邏輯寫在這裡～～～
    });   
  });
});
```

現在我們在裡面寫action的主要功能，用expect的方法，

1. 當onIncrement()被啟動的時候是否可以產生 INCTEMENT的action type
2. onDecrement()這個function是否可以正確回傳 DECREMENT 這個action type

```js
 it('increment should create increment action', () => {
      expect(actions.onIncrement()).toEqual({ type: actions.INCREMENT });
    });    //測試onIncrement()這個function是否可以正確回傳 INCREMENT 這個action type

    it('decrement should create decrement action', () => {
      expect(actions.onDecrement()).toEqual({ type: actions.DECREMENT });
    });    //onDecrement()這個function是否可以正確回傳 DECREMENT 這個action type
```

完整Action的元件測試程式碼如下：

```js
import expect from 'expect';
import * as actions from '../../actions';

describe('actions', () => {
  describe('counter', () => {
    it('increment should create increment action', () => {
      expect(actions.onIncrement()).toEqual({ type: actions.INCREMENT });
    });    //測試onIncrement()這個function是否可以正確回傳 INCREMENT 這個action type

    it('decrement should create decrement action', () => {
      expect(actions.onDecrement()).toEqual({ type: actions.DECREMENT });
    });    //onDecrement()這個function是否可以正確回傳 DECREMENT 這個action type
    
  });
});
```

接著在終端打 `yarn test`執行測試指令，測試通過的話就會出現pass的畫面。

![actions 通過測試畫面](https://i.imgur.com/bQIIUGn.png)

如果失敗的話，也會和你說哪裡錯誤。

## Reducers 測試

需要引入 寫好的reducer 和 action，基本上寫法和剛剛的action差不多。主要就是測試當啟動action的時候值是否可以正確的回傳。下面主要測試四種功能：

1. 測試初始值，因為我在reduce裡面預設初始值是120，所以用toBe(120)，初始值應為120
2. 測試action的type是INCREMENT的時候是否+1，所以應該要在值=1的時候按一下+1
3. 測試action的type是DECREMENT的時候是否-1
4. 測試action的type是其他的時候是否不動作(不產生新的state回傳)

```js
import expect from 'expect';
import counter from '../../reducers/counter';    
import { INCREMENT, DECREMENT} from '../../actions';

describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(counter(undefined, {})).toBe(120);
    });   //測試初始值是否正確

    it('should handle INCREMENT', () => {
      expect(counter(1, { type: INCREMENT })).toBe(2);
    });		//測試action的type是INCREMENT的時候是否+1

    it('should handle DECREMENT', () => {
      expect(counter(3, { type: DECREMENT })).toBe(2);
    });		//測試action的type是DECREMENT的時候是否-1

    it('should handle unknown action type', () => {
      expect(counter(1, { type: 'unknown' })).toBe(1);
    });		//測試action的type是其他的時候是否不動作(不產生新的state回傳)
  });
});

```

![通過測試畫面](https://i.imgur.com/F0G1IxC.png)

## Components

測試元件是否有被正確的繪製出來，並且正確的發起action。

為了可以模擬繪製元件，這裡需要引入以下套件，並進行設定。

```js
...
import jest from "jest-mock";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
....

configure({ adapter: new Adapter() });

...

```

然後我們需要寫一個setup函數用於產生被測試的元件的actions,bottons還有產生的值，這樣後面才接著使用進行測試。

在這邊監視actions以前好像是用expect中的spy函數，但好像新版本就不能用了，會出現typeError，這邊使用jest.fn()。

```js
function setup(counter = 120) { //設定元件的action,buttons,值
  const actions = {
    onIncrement: jest.fn(),		//設定元件的action
    onDecrement: jest.fn()
  };
  const component = shallow(<Counter value={counter} {...actions} />);	
		//繪製元件，並把值和action傳入

  return {
    component,
    actions,
    buttons: component.find("button"),
    span: component.find("span")
  };
}
```

接著就是測試的部分了，在我們計時器的範例中有以下幾個重點需要被測試確認是否正確。

1. 顯示目前計數次數，在我們的範例是用span tag包起來的。
2. 加1 / 減1 按鈕是否有正確發起action

```js
describe("components", () => {
  describe("Counter", () => {
    it("should display count", () => {
      const { span } = setup();
      expect(span.text()).toMatch(/120/);
    });	//測試初始化的值是否正確‘

    it("first button should call increment", () => {
      const { buttons, actions } = setup();
      buttons.at(0).simulate("click");	//simulate模擬按下按扭
      expect(actions.onIncrement).toHaveBeenCalled();
    });		//測試按鈕是否可以正確發起函數

    it("second button should call decrement", () => {
      const { buttons, actions } = setup();
      buttons.at(1).simulate("click");
      expect(actions.onDecrement).toHaveBeenCalled();
    });		//測試按鈕是否可以正確發起函數
  });
});
```

完整元件的測試程式碼如下：

```js
import expect from "expect";
import jest from "jest-mock";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Counter from "../../components/counter";

configure({ adapter: new Adapter() });

function setup(counter = 120) { //設定元件的action,buttons,值
  const actions = {
    onIncrement: jest.fn(),		//設定元件的action
    onDecrement: jest.fn()
  };
  const component = shallow(<Counter value={counter} {...actions} />);	
		//繪製元件，並把值和action傳入

  return {
    component,
    actions,
    buttons: component.find("button"),
    span: component.find("span")
  };
}

describe("components", () => {
  describe("Counter", () => {
    it("should display count", () => {
      const { span } = setup();
      expect(span.text()).toMatch(/120/);
    });	//測試初始化的值是否正確‘

    it("first button should call increment", () => {
      const { buttons, actions } = setup();
      buttons.at(0).simulate("click");	//simulate模擬按下按扭
      expect(actions.onIncrement).toHaveBeenCalled();
    });		//測試按鈕是否可以正確發起函數

    it("second button should call decrement", () => {
      const { buttons, actions } = setup();
      buttons.at(1).simulate("click");
      expect(actions.onDecrement).toHaveBeenCalled();
    });		//測試按鈕是否可以正確發起函數
  });
});

```

如果沒意外的話，寫好在終端機下 `yarn test`	就可以看到跑成功的以下訊息了。

![元件通過測試畫面](https://i.imgur.com/oixT4jp.png)

## Containers

測試container的時候一樣需要引入store及provider，還有要測試的containers。

```js
import expect from 'expect';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../../containers/counter';
import configureStore from '../../store/configureStore';
...

```

測試container需要繪製整個Dom， 所以要使用enzyme套件裡面的mount方法來繪製

```js
...
import { mount , configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
...

configure({adapter: new Adapter()});

...
```

和components一樣，要先寫setup來設定初始的狀態。在這個初始的狀態，需要先把store提供進去containers，然後在看看是否按鈕有正確動作並改變計數器的值(state)。

```js
function setup(initialState) {
  const store = configureStore(initialState);
  const app = mount(
    <Provider store= {store}>
      <App />
    </Provider>
  );
  return {
    app,
    buttons: app.find('button'),
    p: app.find('span')
  };
}
```

接下來就是測試按下按鈕是否可以正確改變值，有以下兩個點：

1. 按下加要正確的把當前計數值+1
2. 減反之

```js
describe('containers', () => {
  describe('App', () => {
    it('should display initial count', () => {
      const { span } = setup();
      expect(span.text()).toMatch(/120/);
    });

    it('should display updated count after increment button click', () => {
      const { buttons, span } = setup();
      buttons.at(0).simulate('click');
      expect(span.text()).toMatch(/121/);
    });

    it('should display updated count after decrement button click', () => {
      const { buttons, span } = setup();
      buttons.at(1).simulate('click');
      expect(span.text()).toMatch(/119/);
    });
  });
```

以下是完整的測試碼

```js
import expect from 'expect';
import React from 'react';
import { mount , configure} from 'enzyme';
import { Provider } from 'react-redux';
import App from '../../containers/counter';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../store/configureStore';

configure({adapter: new Adapter()});

function setup(initialState) {
  const store = configureStore(initialState);
  const app = mount(
    <Provider store= {store}>
      <App />
    </Provider>
  );

  return {
    app,
    buttons: app.find('button'),
    span: app.find('span')
  };
}

describe('containers', () => {
  describe('App', () => {
    it('should display initial count', () => {
      const { span } = setup();
      expect(span.text()).toMatch(/120/);
    });

    it('should display updated count after increment button click', () => {
      const { buttons, span } = setup();
      buttons.at(0).simulate('click');
      expect(span.text()).toMatch(/121/);
    });

    it('should display updated count after decrement button click', () => {
      const { buttons, span } = setup();
      buttons.at(1).simulate('click');
      expect(span.text()).toMatch(/119/);
    });
  });
});
```

如果到這裡都順利完成了，恭喜你，所有的測試都過關了～～！

![Containers通過測試畫面](https://i.imgur.com/V41G7tD.png)