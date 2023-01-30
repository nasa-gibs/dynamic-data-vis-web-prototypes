import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector,
} from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import type { RootState, AppDispatch } from "./store";

// export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAppDispatch(): ThunkDispatch<RootState, void, any> {
  return useReduxDispatch<ThunkDispatch<RootState, void, any>>();
}
