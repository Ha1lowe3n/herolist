import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createSelector } from "reselect";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHero,
} from "../../state/slice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.heroes,
        (state) => state.filter,
        (heroes, filter) => {
            if (filter === "all") {
                return heroes;
            } else {
                return heroes.filter((hero) => hero.element === filter);
            }
        }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(
        (state) => state.heroesLoadingStatus
    );
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then((data) => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));

        // eslint-disable-next-line
    }, []);

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
                <CSSTransition key={id} timeout={500} classNames="hero">
                    <HeroesListItem
                        id={id}
                        {...props}
                        onDeleteHero={onDeleteHero}
                    />
                </CSSTransition>
            );
        });
    };

    const elements = renderHeroesList(filteredHeroes);
    return <TransitionGroup>{elements}</TransitionGroup>;
};

export default HeroesList;
