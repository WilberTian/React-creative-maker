import React, { PureComponent } from 'react';
import { hashHistory } from 'react-router';
import { Input, Button } from 'antd';

import DomainMapper from '../../../utils/DomainMapper';

import TplSelectorComponent from './TplSelectorComponent';
import CreativeDesignComponent from './CreativeDesignComponent';

const mapper = {
    modelMapper: () => {},
    actionMapper: (action) => {
        return {
            updateCreativeData: action.updateCreativeData
        };
    }
};

@DomainMapper(mapper)
export default class CreativeGenComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            creativeName: ''
        };
    }

    _handleCreativeNameChange(e) {
        const { updateCreativeData } = this.props;

        this.setState({
            creativeName: e.target.value
        });

        updateCreativeData('creativeName', e.target.value);
    }

    _cancel() {
        hashHistory.goBack();
    }

    render() {
        return (
            <div className="creative-gen-component">
                <div className="creative-name-form">
                    <span className="label">
                        创意名称
                    </span>
                    <Input
                      value={this.state.creativeName}
                      placeholder="输入名称，不超过14个字"
                      size="large"
                      onChange={::this._handleCreativeNameChange}
                    />
                </div>
                <TplSelectorComponent />
                <CreativeDesignComponent />
                <div className="btn-group">
                    <Button>
                        确认
                    </Button>
                    <Button onClick={::this._cancel}>
                        取消
                    </Button>
                </div>
            </div>
        );
    }
}
