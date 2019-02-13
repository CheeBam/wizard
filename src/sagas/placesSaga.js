import { delay, put, call, select, takeLatest, all } from 'redux-saga/effects';
import { CHANGE_USER_ADDRESS } from "../actions/userActions";

// import { PlaceActions } from '../actions/place';
// import { MapsActions } from '../actions/maps';

// import { getPlaceSuggestions } from '../api/get-place-suggestions';

export function * placeSuggestionsSaga (data) {
    // const { maps: { isApiLoaded } } = yield select();

    // если API гугл карт не загрузилось,
    // то ждём события его загрузки
    // if (!isApiLoaded) {
    //     yield take(MapsActions.apiLoaded);
    // }

    // получаем код страны и Google Places Autocomplete из store
    // const { maps: { autocompleteService }, countryCode } = yield select();

    // если пользователь всё стёр,
    // то удаляем подсказки и выбранное ранее значение
    // if (query) {
    //     yield put(PlaceActions.suggestions([]));
    //     yield put(PlaceActions.select(null));
    //     return;
    // }

    // даём 250мс на допечатку запроса
    yield call(delay, 250);

    // вызываем API метод
    // const suggestions = yield call(
    //     getPlaceSuggestions,
    //     autocompleteService,
    //     countryCode,
    //     query,
    // );

    // создаём action с подсказками
    // const action = PlacesActions.suggestions(suggestions || []);

    // и посылаем его в store
    // yield put(action);
};

/**
 * Static sagas
 */
export default function* staticSagas() {
    yield all([
        takeLatest(CHANGE_USER_ADDRESS, placeSuggestionsSaga),
    ]);
}
