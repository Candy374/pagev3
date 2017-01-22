/**
 * Created by huangling on 22/01/2017.
 */
import {SettingTypes} from '../constants';

const initialState = {
  show: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SettingTypes.TOGGLE_SHOW:
      return {...state, ...{show: action.show}};
    default:
      return state;
  }
}
