import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

type AppSelector<T> = TypedUseSelectorHook<T>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: AppSelector<RootState> = useSelector;
