import { FC, ReactNode, createContext, useContext, useRef } from "react";
import { createStore } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import logger from "@/state/logger";
import IntroStep from "@/steps/Intro";
import EnergiserStep from "@/steps/Energiser";
import RetroActionItemsStep from "@/steps/RetroActionItems";
import RetroThemeStep from "@/steps/RetroTheme";
import getRandomItemFromArray from "@/utils/getRandomItemFromArray";
import { introGifs } from "@/state/introGifs";
import energisers, { Energiser } from "../../energisers";
import retroThemes, { RetroTheme } from "../../retro-themes";

export interface RetroState {
  openCommandPalette: boolean;
  setOpenCommandPalette: (open: boolean) => void;
  toggleOpenCommandPalette: () => void;

  step: number;
  setStep: (step: number) => void;
  increaseStep: () => void;
  decreaseStep: () => void;
  steps: ReactNode[];

  introGif: string;
  randomiseIntroGif: () => void;
  energiser: Energiser;
  randomiseEnergiser: () => void;
  retroTheme: RetroTheme;
  randomiseRetroTheme: () => void;
}

type RetroStore = ReturnType<typeof createRetroStore>;

const createRetroStore = (initialState?: Partial<RetroState>) => {
  return createStore<RetroState>()(
    logger(
      (set) => ({
        openCommandPalette: false,
        setOpenCommandPalette: (open: boolean) =>
          set(() => ({
            openCommandPalette: open,
          })),
        toggleOpenCommandPalette: () =>
          set((state) => ({
            openCommandPalette: !state.openCommandPalette,
          })),

        step: 0,
        setStep: (step: number) =>
          set(() => ({
            step,
          })),
        increaseStep: () =>
          set((state) => {
            if (state.step === state.steps.length - 1) return state;
            return {
              step: state.step + 1,
            };
          }),
        decreaseStep: () =>
          set((state) => {
            if (state.step === 0) return state;
            return {
              step: state.step - 1,
            };
          }),
        steps: [
          <IntroStep />,
          <RetroActionItemsStep />,
          <EnergiserStep />,
          <RetroThemeStep />,
        ],
        introGif: getRandomItemFromArray(introGifs),
        randomiseIntroGif: () =>
          set((state) => {
            const getNewIntroGif = (): string => {
              const newIntroGif: string = getRandomItemFromArray(introGifs);
              if (newIntroGif === state.introGif) return getNewIntroGif();
              return newIntroGif;
            };

            return {
              introGif: getNewIntroGif(),
            };
          }),
        energiser: getRandomItemFromArray(energisers),
        randomiseEnergiser: () =>
          set((state) => {
            const getNewEnergiser = (): Energiser => {
              const newEnergiser: Energiser =
                getRandomItemFromArray(energisers);
              if (newEnergiser.id === state.energiser.id)
                return getNewEnergiser();
              return newEnergiser;
            };

            return {
              energiser: getNewEnergiser(),
            };
          }),
        retroTheme: getRandomItemFromArray(retroThemes),
        randomiseRetroTheme: () =>
          set((state) => {
            const getNewRetroTheme = (): RetroTheme => {
              const newRetroTheme: RetroTheme =
                getRandomItemFromArray(retroThemes);
              if (newRetroTheme.title === state.retroTheme.title)
                return getNewRetroTheme();
              return newRetroTheme;
            };

            return {
              retroTheme: getNewRetroTheme(),
            };
          }),
        ...initialState,
      }),
      {
        enabled: true,
      },
    ),
  );
};

const RetroContext = createContext<RetroStore | undefined>(undefined);

type RetroProviderProps = {
  context?: Partial<RetroState>;
  children: ReactNode;
};

export const RetroProvider: FC<RetroProviderProps> = ({
  context,
  children,
}) => {
  const storeRef = useRef<RetroStore>();

  if (!storeRef.current) storeRef.current = createRetroStore(context);

  return (
    <RetroContext.Provider value={storeRef.current}>
      {children}
    </RetroContext.Provider>
  );
};

export function useRetroState<T>(
  selector?: (state: RetroState) => T,
  equalityFn?: (left: T, right: T) => boolean,
): T {
  const store = useContext(RetroContext);
  if (!store)
    throw new Error("RetroProvider must be used within a StateProvider");

  return useStoreWithEqualityFn(
    store,
    selector || (((s) => s) as (s: RetroState) => T),
    equalityFn,
  );
}
