import request from '../util/request';

const delay = (millisecond) => {
    return new Promise((resolve => {
        setTimeout(resolve, millisecond);
    }));
};
export default {
    namespace: 'puzzleCards',
    state: {
        data: [
            {
                id: 1,
                setup: '好看吗？',
                punchline: '不好看',
            },
            {
                id: 2,
                setup: '真好看！',
                punchline: "我也这么认为",
            },
        ],
        counter: 100,
    },
    effects: {
        * queryInitCards(_, sagaEffects) {
            debugger
            const {call, put} = sagaEffects;
            const endPointURI = 'https://safe-falls-22549.herokuapp.com/random_jokex';

            const puzzle = yield call(request, endPointURI);
            yield put({type: 'addNewCard', payload: puzzle});

            yield call(delay, 3000);

            const puzzle2 = yield call(request, endPointURI);
            yield put({type: 'addNewCard', payload: puzzle2});
        }
    },
    reducers: {
        addNewCard(state, {payload: newCard}) {
            const nextCounter = state.counter + 1;
            const newCardWithId = {...newCard, id: nextCounter};
            const nextData = state.data.concat(newCardWithId);
            return {
                data: nextData,
                counter: nextCounter,
            }
        }
    }
};