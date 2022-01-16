import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./HeroesFilters.module.scss";

import { changeFilter } from "../../state/slice";

const HeroesFilters = () => {
    const { filter } = useSelector((state) => state);
    const dispatch = useDispatch();

    const changeFilters = (filter) => {
        let correctFilter;

        switch (filter) {
            case "Огонь":
                correctFilter = "fire";
                break;
            case "Вода":
                correctFilter = "water";
                break;
            case "Ветер":
                correctFilter = "wind";
                break;
            case "Земля":
                correctFilter = "earth";
                break;
            default:
                correctFilter = "all";
        }

        dispatch(changeFilter(correctFilter));
    };

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button
                        className={`btn btn-outline-dark ${
                            filter === "all" ? styles.active : ""
                        }`}
                        onClick={(e) => changeFilters(e.target.innerText)}
                    >
                        Все
                    </button>
                    <button
                        className={`btn btn-danger ${
                            filter === "fire" ? styles.active : ""
                        }`}
                        onClick={(e) => changeFilters(e.target.innerText)}
                    >
                        Огонь
                    </button>
                    <button
                        className={`btn btn-primary ${
                            filter === "water" ? styles.active : ""
                        }`}
                        onClick={(e) => changeFilters(e.target.innerText)}
                    >
                        Вода
                    </button>
                    <button
                        className={`btn btn-success ${
                            filter === "wind" ? styles.active : ""
                        }`}
                        onClick={(e) => changeFilters(e.target.innerText)}
                    >
                        Ветер
                    </button>
                    <button
                        className={`btn btn-secondary ${
                            filter === "earth" ? styles.active : ""
                        }`}
                        onClick={(e) => changeFilters(e.target.innerText)}
                    >
                        Земля
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroesFilters;
