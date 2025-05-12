import React from "react";
import { Link } from "react-router-dom";

const InfoAboutOrder = ({ name, description, volume, weight, length, width, height, from, to, bodyType, loadType, unloadType, price, typePay, readyDate, deliveryDate, typePage, carrier, transport, customer, disabled, onClickCancel, onClickConfirm }) => {
    return (
        <div className={`info ${typePage === 'customer_biddings' ? 'info--biddings' : ''}`}>
            {(typePage === 'customer_biddings') && (
                <h2 className="info__title">
                    Информация о грузе
                </h2>
            )}
            <div className="info__content">
                <div className="info__inner-item">Название груза: <span>{name}</span></div>
                <div className="info__inner-item">Описание груза: <span>{description}</span></div>
            </div>
            <div className="info__content">
                <div className="info__content-inner">
                    <div className="info__inner-item">Объем: <span>{volume}</span> кв.м</div>
                    <div className="info__inner-item">Вес: <span>{weight}</span> т</div>
                </div>
                <div className="info__content-inner">
                    <div className="info__inner-item">Длина: <span>{length}</span> м</div>
                    <div className="info__inner-item">Ширина: <span>{width}</span> м</div>
                    <div className="info__inner-item">Высота: <span>{height}</span> м</div>
                </div>
            </div>
            <div className="info__content">
                <div className="info__content-inner">
                    <div className="info__inner-item">Откуда: <span>{from}</span></div>
                    <div className="info__inner-item">Куда: <span>{to}</span></div>
                </div>
                <div className="info__content-inner">
                    <div className={`info__inner-item ${typePage === 'customer_biddings' ? 'info__inner-item--biddings' : ''}`}>Тип кузова: <span>{bodyType}</span></div>
                    <div className={`info__inner-item ${typePage === 'customer_biddings' ? 'info__inner-item--biddings' : ''}`}>Тип загрузки: <span>{loadType}</span></div>
                    <div className={`info__inner-item ${typePage === 'customer_biddings' ? 'info__inner-item--biddings' : ''}`}>Тип выгрузки: <span>{unloadType}</span></div>
                </div>
            </div>
            <div className="info__content">
                <div className="info__content-inner">
                    <div className="info__inner-item">Цена: <span>{price}</span></div>
                    <div className="info__inner-item">Тип ставки: <span>{typePay}</span></div>
                </div>
            </div>
            <div className="info__content">
                <div className="info__inner-item">Планируемая дата загрузки: <span>{readyDate}</span></div>
                <div className="info__inner-item">Планируемая дата выгрузки: <span>{deliveryDate}</span></div>
            </div>
            {(typePage === 'customer_active' || typePage === 'customer_history') ?
                <div className="info__content">
                    <div className="info__inner-item">Исполнитель: <span><Link>{carrier}</Link></span></div>
                    <div className="info__inner-item">Транспорт: <span><Link>{transport}</Link></span></div>
                </div> :
                (typePage !== 'customer_biddings') &&
                (<div className="info__content">
                    <div className="info__inner-item">Заказчик: <span><Link>{customer}</Link></span></div>
                </div>)
            }
            {(typePage === "customer_active") && (
                <div className="info__btnBox">
                    <button className="info__btnBox-button" onClick={onClickCancel}>Отменить</button>
                    <button className="info__btnBox-button" onClick={onClickConfirm} disabled={disabled}>Подтвердить завершение</button>
                </div>
            )}
            {(typePage === "customer_biddings" || typePage === "carrier_biddings") && (
                <div className="info__btnBox">
                    <button className="info__btnBox-button" onClick={onClickCancel}>Отменить</button>
                </div>
            )}
            {(typePage === "carrier_active") && (
                <div className="info__btnBox">
                    <button className="info__btnBox-button" onClick={onClickCancel}>Отменить</button>
                    <button className="info__btnBox-button" onClick={onClickConfirm} disabled={disabled}>Завершить</button>
                </div>
            )}
            {/* <div className="info__btnBox">
                <button className="info__btnBox-button">Отменить</button>
                <button className="info__btnBox-button">Завершить</button>
            </div> */}
        </div>
    )
};

export default InfoAboutOrder;