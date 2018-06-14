import { call, put, takeEvery } from 'redux-saga/effects';
import FORM_TYPES from './types';
import formActions from './actions';
import encounterRest from '../../rest/encounterRest'

function* submit(action) {

  // TODO double submits, correct form, tate, etc

  try {

    // TODO is this actually what we want to pass back in the success action (all the input data?)
    let response = yield call(encounterRest.createEncounter, {
      encounter: {
        encounterDatetime: new Date(),
        patient: action.patient.uuid,
        encounterType: action.encounterType.uuid,
        visit: action.visit ? action.visit.uuid : null            // TODO does this work correctly if visit is null?
      }
    });

    yield put(formActions.formSubmitSucceeded(action.values, action.encounterType, action.patient));
  }
  catch (e) {
    yield put(formActions.formSubmitFailed(action.values, action.encounterType, action.patient));
  }
}


function *formSagas() {
  // TODO take latest or take every
  yield takeEvery(FORM_TYPES.SUBMIT, submit);
}

export default formSagas;