import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import {
    createHero,
    heroesFetching,
    heroesFetchingError,
} from "../../state/slice";

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const [nameValue, setNameValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [elemValue, setElemValue] = useState("");

    const changeName = (e) => setNameValue(e.currentTarget.value);
    const changeDesc = (e) => setDescValue(e.currentTarget.value);
    const changeElem = (e) => setElemValue(e.currentTarget.value);

    const onSubmit = (e) => {
        e.preventDefault();

        const newHero = {
            id: nanoid(),
            name: nameValue,
            description: descValue,
            element: elemValue,
        };

        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes`, "POST", JSON.stringify(newHero))
            .then(() => dispatch(createHero(newHero)))
            .catch((err) => {
                console.error(err);
                dispatch(heroesFetchingError());
            });

        setNameValue("");
        setDescValue("");
        setElemValue("");
    };

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    Имя нового героя
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={nameValue}
                    onChange={changeName}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">
                    Описание
                </label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ height: "130px" }}
                    value={descValue}
                    onChange={changeDesc}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Выбрать элемент героя
                </label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={elemValue}
                    onChange={changeElem}
                >
                    <option>Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
