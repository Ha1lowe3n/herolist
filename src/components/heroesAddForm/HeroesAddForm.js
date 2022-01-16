import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { createHero } from "../../state/slice";

const HeroesAddForm = () => {
    const dispatch = useDispatch();

    const [nameValue, setNameValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [elemValue, setElemValue] = useState("");

    const changeName = (e) => setNameValue(e.currentTarget.value);
    const changeDesc = (e) => setDescValue(e.currentTarget.value);
    const changeElem = (e) => setElemValue(e.currentTarget.value);

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(
            createHero({
                id: nanoid(),
                name: nameValue,
                description: descValue,
                element: elemValue,
            })
        );

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
