import request from '../util/request';
import {message} from 'antd';

const delay = (millisecond) => {
    return new Promise((resolve => {
        setTimeout(resolve, millisecond);
    }));
};
export default {
    namespace: 'puzzleCards',
    state: {
        data: [],
        counter: 100,
    },
    effects: {
        * queryInitCards(_, sagaEffects) {
            try {
                const {call, put} = sagaEffects;
                const endPointURI = '/dev/random_joke';
                yield put({type: 'init'});

                const puzzle = yield call(request, endPointURI);
                yield put({type: 'addNewCard', payload: puzzle});

                const puzzle2 = yield call(request, endPointURI);
                yield put({type: 'addNewCard', payload: puzzle2});
            } catch (e) {
                message.error('捕获数据失败');
            }
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
        },
        init() {
            return {
                data: [],
                counter: 1,
            }
        }
    }
};