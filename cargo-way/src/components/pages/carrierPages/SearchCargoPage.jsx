import { observer } from "mobx-react-lite";
import SearchForm from "../../forms/SearchForm";
import { motion } from "framer-motion";
import ListItems from "../../ListItems";

const SearchCargoPage = observer(() => {

    const listTest = {
        "content": [
            {
                "id": "980bf2b4-26f6-4384-9fca-19de25e57e78",
                "visibility": "DRAFT",
                "startExecution": null,
                "endExecution": null,
                "orderCreatedAt": "2025-04-18T10:43:03.44185",
                "orderUpdatedAt": null,
                "cargo": {
                    "name": "Box",
                    "description": "Большая коробка",
                    "weight": 10,
                    "volume": 100,
                    "loadType": "Задняя",
                    "unloadType": "Задняя",
                    "bodyType": "Тент",
                    "dimensions": {
                        "length": 10,
                        "width": 5,
                        "height": 20
                    },
                    "route": {
                        "from": "New York",
                        "to": "Los Angeles"
                    },
                    "price": 99.99,
                    "typePay": "НДС",
                    "readyDate": "2025-05-22",
                    "deliveryDate": "2025-06-01"
                }
            },
            {
                "id": "fca97c4f-5c56-46a8-a15b-0dcf405bfbe6",
                "visibility": "DRAFT",
                "startExecution": null,
                "endExecution": null,
                "orderCreatedAt": "2025-04-18T10:43:05.137901",
                "orderUpdatedAt": null,
                "cargo": {
                    "name": "Box",
                    "description": "Большая коробка",
                    "weight": 10,
                    "volume": 100,
                    "loadType": "Задняя",
                    "unloadType": "Задняя",
                    "bodyType": "Тент",
                    "dimensions": {
                        "length": 10,
                        "width": 5,
                        "height": 20
                    },
                    "route": {
                        "from": "New York",
                        "to": "Los Angeles"
                    },
                    "price": 99.99,
                    "typePay": "НДС",
                    "readyDate": "2025-05-22",
                    "deliveryDate": "2025-06-01"
                }
            }
        ],
        "pageNumber": 0,
        "pageSize": 10,
        "totalPages": 1
    }


    return (
        <div className="searchPage">
            <motion.div className="searchPage__formBox"
                initial={
                    {
                        scale: 0
                    }
                }
                whileInView={
                    {
                        scale: 1
                    }
                }
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <div className="searchPage__formBox-form">
                    <SearchForm
                    // data={store.formData}
                    // onChange={handleInputChange}
                    />
                </div>
            </motion.div>
            <div className="searchPage__list">
                <ListItems type="main" list={listTest.content} buttons={[{ label: "Узнать подробности", onClick: {} }]} />
            </div>
        </div>
    )
});

export default SearchCargoPage;