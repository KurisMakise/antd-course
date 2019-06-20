import React from 'react';
import {Table, Modal, Button, Form, Input} from 'antd';
import {connect} from 'dva';
import SampleChart from "../../components/SampleChart";

const FormItem = Form.Item;
const namespace = 'cards';

class List extends React.Component {
    state = {
        visible: false,
        statisticVisible: false,
        id: null,
        prevProps: null,
    };

    columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '链接',
            dataIndex: 'url',
            render: value => <a href={value}>{value}</a>,
        },
        {
            title: '',
            dataIndex: 'statistic',
            render: (_, {id}) => {
                return (
                    <Button onClick={() => {
                        this.showStatistic(id);
                    }}>图标</Button>
                );
            },
        }
    ];

    componentDidMount() {
        this.props.dispatch({
            type: `${namespace}/queryList`,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.refreshChart();
        }
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    showStatistic = (id) => {
        this.props.dispatch({
            type: `${namespace}/getStatistic`,
            payload: id,
        });
        this.setState({id, statisticVisible: true});
    };

    handleStatisticCancel = () => {
        this.setState({
            statisticVisible: false,
            prevProps: this.props,
        });
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleOK = () => {
        const {dispatch, form: {validateFields}} = this.props;

        validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: `${namespace}/addOne`,
                    payload: values,
                });
                this.setState({visible: false});
            }
        });
    };


    render() {
        const {visible, id, statisticVisible} = this.state;
        const {cardsList, cardsLoading, form: {getFieldDecorator}, statistic} = this.props;
        return (
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey={"id"}/>

                <Button onClick={this.showModal}>新建</Button>

                <Modal title={"新建记录"}
                       visible={visible}
                       onOk={this.handleOK}
                       onCancel={this.handleCancel}

                >
                    <Form>
                        <FormItem label={'名称'}>
                            {getFieldDecorator('name', {
                                rules: [{required: true}],
                            })(
                                <Input/>
                            )}
                        </FormItem>

                        <FormItem label={'描述'}>
                            {getFieldDecorator('desc')(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label={"链接"}>
                            {getFieldDecorator('url', {
                                rules: [{type: 'url'}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        {/*<FormItem label={'自定义输入'}>*/}
                        {/*    {getFieldDecorator('custom', {*/}
                        {/*        rules: [{required: true}],*/}
                        {/*    })(*/}
                        {/*        <YourInput/>*/}
                        {/*    )}*/}
                        {/*</FormItem>*/}
                    </Form>
                </Modal>

                <Modal  visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
                    <SampleChart data={statistic[id]}   />
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        cardsList: state[namespace].cardsList,
        cardsLoading: state.loading.effects[`${namespace}/queryList`],
        statistic: {
            1: [{genre: 'Sports', sold: 100},
                {genre: 'Strategy', sold: 100},
                {genre: 'Action', sold: 100},
                {genre: 'Shooter', sold: 100},
                {genre: 'Other', sold: 100},],
            2: [{genre: 'Sports', sold: 200},
                {genre: 'Strategy', sold: 200},
                {genre: 'Action', sold: 200},
                {genre: 'Shooter', sold: 200},
                {genre: 'Other', sold: 200},],
            3: [{genre: 'Sports', sold: 300},
                {genre: 'Strategy', sold: 300},
                {genre: 'Action', sold: 300},
                {genre: 'Shooter', sold: 300},
                {genre: 'Other', sold: 300},]
        },

    };

};
export default connect(mapStateToProps)(Form.create()(List));
