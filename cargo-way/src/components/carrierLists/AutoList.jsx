import GenericList from "../listsTemplates/GenericList";

const AutoList = ({ list, onClickEdit, onClickDelete }) => {
    const columns = [
        { key: 'transportNumber', title: 'Номер транспорта' },
        { key: 'brand', title: 'Марка' },
        { key: 'model', title: 'Модель' },
        { key: 'manufactureYear', title: 'Год выпуска' },
        { key: 'driverId', title: 'Водитель', hideOnMobile: true },
    ];

    const getItemProps = (item) => ({
        fields: [
            { key: 'transportNumber', value: item.transportNumber },
            { key: 'brand', value: item.brand },
            { key: 'model', value: item.model },
            { key: 'manufactureYear', value: item.manufactureYear },
            { key: 'driverId', value: item.driver.fullName, hideOnMobile: true },
        ],
        buttons: [
            { label: 'Редактировать', onClick: () => onClickEdit(item) },
            { label: 'Удалить', onClick: () => onClickDelete(item) },
        ]
    });

    return (
        <GenericList
            list={list}
            columns={columns}
            getItemProps={getItemProps}
            headerClassName="genericList__result-header--transport"
            itemClassName="genericList__item-text--transport"
        />
    );
};

export default AutoList;