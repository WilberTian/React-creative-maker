import React, { PureComponent } from 'react';
import cx from 'classnames';

export default class MaterialListComponent extends PureComponent {
    render() {
        const { materialImgList, selectedMaterialImg, setSelectedMaterialImg } = this.props;

        return (
            <div className="material-list-component">
                { materialImgList.map((materialImgItem, index) => {
                    const resourceImageClass = cx({
                        'resource-image': true,
                        active: selectedMaterialImg && (materialImgItem.resourceId === selectedMaterialImg.resourceId)
                    });
                    /* eslint-disable jsx-a11y/no-static-element-interactions */
                    return (
                        <div className={resourceImageClass} key={index} onClick={() => {
                            setSelectedMaterialImg(materialImgItem);
                        }}
                        >
                            <img src={materialImgItem.imgUrl} key={index} alt="" />
                        </div>
                    );
                    /* eslint-enable jsx-a11y/no-static-element-interactions */
                })}
            </div>
        );
    }
}

