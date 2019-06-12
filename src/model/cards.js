import request from '../util/request';

const delay = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
};
export default {
    namespace: 'cards',
    state: {
        cardsList: []
    },
    effects: {
        * queryList(_, sagaEffects) {
            const listData = [
                {
                    key: 1,
                    name: 'umi',
                    desc: '极快的类 Next.js 的 React 应用框架',
                    url: 'https://umijs.org'
                },
                {
                    key: 2,
                    name: 'antd',
                    desc: '一个服务于企业级产品的设计体系',
                    url: 'https://ant.design/index-cn'
                },
                {
                    key: 3,
                    name: 'antd-pro',
                    desc: '一个服务于企业级产品的设计体系',
                    url: 'https://ant.design/index-cn'
                }
            ];
            const {call, put} = sagaEffects;
            yield call(delay, 300);
            yield put({type: 'initList', payload: listData});
        }
    },
    reducers: {
        initList(state, {payload}) {
            const cardsList = [...payload];
            return {
                cardsList
            };
        }
    }
};