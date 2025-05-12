import { observer } from "mobx-react-lite";
import TopBar from "../TopBar";
import { cargoStore } from "../../stores/CargoStore";
import InfoAboutOrder from "../InfoAboutOrder";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetailsCargo } from "../../api/cargoService";

const InfoOrderPage = observer(({ typePage }) => {
    // const param = useParams();
    // const id = param.id;
    // const location = useLocation();
    // const navigate = useNavigate();
    // const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "", item: null });
    // const [isLoading, setIsLoading] = useState(true);

    // const listTest = {
    //     "content": [
    //         {
    //             "id": "980bf2b4-26f6-4384-9fca-19de25e57e78",
    //             "visibilityStatus": "IN_PROGRESS",
    //             "startExecution": null,
    //             "endExecution": null,
    //             "orderCreatedAt": "2025-04-18T10:43:03.44185",
    //             "orderUpdatedAt": null,
    //             "cargo": {
    //                 "name": "Box",
    //                 "description": "Большая коробка",
    //                 "weight": 10,
    //                 "volume": 100,
    //                 "loadType": "Задняя",
    //                 "unloadType": "Задняя",
    //                 "bodyType": "Тент",
    //                 "dimensions": {
    //                     "length": 10,
    //                     "width": 5,
    //                     "height": 20
    //                 },
    //                 "route": {
    //                     "from": "New York",
    //                     "to": "Los Angeles"
    //                 },
    //                 "price": 99.99,
    //                 "typePay": "НДС",
    //                 "readyDate": "2025-05-22",
    //                 "deliveryDate": "2025-06-01"
    //             }
    //         },
    //         {
    //             "id": "fca97c4f-5c56-46a8-a15b-0dcf405bfbe6",
    //             "visibilityStatus": "BIDDING",
    //             "startExecution": null,
    //             "endExecution": null,
    //             "orderCreatedAt": "2025-04-18T10:43:05.137901",
    //             "orderUpdatedAt": null,
    //             "cargo": {
    //                 "name": "Box",
    //                 "description": "Большая коробка",
    //                 "weight": 10,
    //                 "volume": 100,
    //                 "loadType": "Задняя",
    //                 "unloadType": "Задняя",
    //                 "bodyType": "Тент",
    //                 "dimensions": {
    //                     "length": 10,
    //                     "width": 5,
    //                     "height": 20
    //                 },
    //                 "route": {
    //                     "from": "New York",
    //                     "to": "Los Angeles"
    //                 },
    //                 "price": 99.99,
    //                 "typePay": "НДС",
    //                 "readyDate": "2025-05-22",
    //                 "deliveryDate": "2025-06-01"
    //             }
    //         }
    //     ],
    //     "pageNumber": 0,
    //     "pageSize": 10,
    //     "totalPages": 1
    // }

    // const loadCargoList = async () => {
    //     try {
    //         setIsLoading(true);
    //         await listStore.fetchCargoList();
    //     } catch (error) {
    //         console.error("Ошибка загрузки списка грузов:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     // async function getData() {
    //     //     const data = await getDetailsCargo(id);
    //     //     cargoStore.setCargoFormDataFromServer(data.cargo);
    //     //     console.log(data);
    //     // };
    //     // getData();
    //     console.log('data');
    // }, [location.pathname]);

    // useEffect(() => {
    //     return () => {
    //         cargoStore.resetFormData();
    //     };
    // }, []);


    // useEffect(() => {
    //     console.log('1. Effect RUN (on mount)');
    //     return () => console.log('1. Effect CLEANUP');
    // }, []);

    // useEffect(() => {
    //     console.log('2. Effect RUN (pathname changed)', location.pathname);
    //     return () => console.log('2. Effect CLEANUP');
    // }, [location.pathname]);

    return (
        <div className="cargoList">
            <div className="container">
                <TopBar />
                <h2 className="cargoList__title">Информация о заказе</h2>
                <InfoAboutOrder
                    {...cargoStore.cargoFormData}
                    from={cargoStore.cargoFormData.route.from}
                    to={cargoStore.cargoFormData.route.to}
                    length={cargoStore.cargoFormData.dimensions['length']}
                    width={cargoStore.cargoFormData.dimensions.width}
                    height={cargoStore.cargoFormData.dimensions.height}
                    typePage={typePage} />
            </div>
        </div>
    );
});

export default InfoOrderPage;
