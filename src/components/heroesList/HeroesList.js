import { useHttp } from "../../hooks/http.hook";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHero,
} from "../../state/actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const { filteredHeroes, heroesLoadingStatus, heroes } = useSelector(
        (state) => state
    );
    const dispatch = useDispatch();
    const { request } = useHttp();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const heroesMemo = useMemo(() => heroes, []);

    useEffect(() => {
        dispatch(heroesFetching());
        console.log("use effect");
        request("http://localhost:3001/heroes")
            .then((data) => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));

        // eslint-disable-next-line
    }, [heroesMemo]);

    const onDeleteHero = (heroId) => {
        request(`http://localhost:3001/heroes/${heroId}`, "DELETE")
            .then(() => dispatch(deleteHero(heroId)))
            .catch((err) => console.error(err));
    };

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>;
        }

        return arr.map(({ id, ...props }) => {
            return (
                <HeroesListItem
                    key={id}
                    id={id}
                    {...props}
                    onDeleteHero={onDeleteHero}
                />
            );
        });
    };

    const elements = renderHeroesList(filteredHeroes);
    return <ul>{elements}</ul>;
};

export default HeroesList;
