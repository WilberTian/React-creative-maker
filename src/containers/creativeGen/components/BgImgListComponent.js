import React, { PureComponent } from 'react';

import DomainMapper from '../../../utils/DomainMapper';

import BgImgItemComponent from './BgImgItemComponent';

const mapper = {
    modelMapper: (model) => {
        return {
            bgImgList: model.bgImgList,
            bgItem: model.bgItem
        };
    },
    actionMapper: (action) => {
        return {
            queryBackground: action.queryBackground
        };
    }
};

@DomainMapper(mapper)
export default class BgImgListComponent extends PureComponent {
    componentWillMount() {
        this._getBgImgList();
    }

    async _getBgImgList() {
        const { queryBackground, bgImgList, choosenBgId, setSelectedBgImgItem } = this.props;
        await queryBackground();
    }

    render() {
        const { bgImgList, selectedBgImgItem } = this.props;

        return (
            <div>
                <div className="bg-image-list-component">
                    { bgImgList.map((bgImgItem, index) => {
                        return (<BgImgItemComponent
                          bgImgItem={bgImgItem}
                          key={index}
                        />);
                    })}
                </div>
            </div>
        );
    }
}
