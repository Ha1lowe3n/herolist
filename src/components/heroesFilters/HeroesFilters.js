import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./HeroesFilters.module.scss";

import { addFilter, deleteFilter } from "../../state/actions";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { filters } = useSelector((state) => state);
    const dispatch = useDispatch();

    const changeFilters = (filter) => {
        let correctFilter;

        console.log(filter);

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

        console.log(correctFilter);

        if (!filters.some((f) => f === correctFilter)) {
            dispatch(addFilter(correctFilter));
        } else {
            dispatch(deleteFilter(correctFilter));
        }
    };

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button
                        className={`btn btn-outline-dark ${
                            filters.some((filter) => filter === "all")
                                ? styles.active
                                : ""
                        }`}
                        onClick={(e) => changeFilters(e.target.innerText)}
                    >
                        Все
                    </button>
                    <button
                        className={`btn btn-danger ${
                            filters.some((filter) => filter === "fire")
                                ? styles.active
                                : ""
                        }`}
                        onClick={(e) => changeFilters(e.target.innerText)}
                    >
                        Огонь
                    </button>
                    <button
                        className={`btn btn-primary ${
                            filters.some((filter) => filter === "water")
                                ? styles.active
                                : ""
                        }`}
                        onClick={(e) => changeFilters(e.target.innerText)}
                    >
                        Вода
                    </button>
                    <button
                        className={`btn btn-success ${
                            filters.some((filter) => filter === "wind")
                                ? styles.active
                                : ""
                        }`}
                        onClick={(e) => changeFilters(e.target.innerText)}
                    >
                        Ветер
                    </button>
                    <button
                        className={`btn btn-secondary ${
                            filters.some((filter) => filter === "earth")
                                ? styles.active
                                : ""
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
