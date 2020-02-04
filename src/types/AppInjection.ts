import { IO } from 'fp-ts/lib/IO';
import { Option } from 'fp-ts/lib/Option';
import { VNode } from 'vue';
import { NoticePlacement } from './NoticePlacement';
import { Theme } from './Theme';
import { Transition } from './Transition';

export interface AppInjection {
  theme: ThemeInjection;
  navigation: NavigationInjection;
  notice: NoticeInjection;
  modal: ModalInjection;
}

export interface ThemeInjection {
  isThemeable: boolean;
  currentTheme: Option<Theme>; // allows for easier defaults in injected component
  setTheme: (theme: Theme) => void;
}

export interface NavigationInjection {
  navigationDrawerIsVisible: boolean;
  showNavigationDrawer: IO<void>;
  hideNavigationDrawer: IO<void>;
  toggleNavigationDrawer: IO<void>;
}

export interface NoticeInjection {
  showNotice: (options: ShowNoticeOptions) => IO<void>;
}

export interface ShowNoticeOptions {
  node: VNode;
  placement: NoticePlacement;
  duration: number;
  shouldQueue: boolean;
  transition?: Transition;
}

export interface ModalInjection {
  showModal: (options: ShowModalOptions) => IO<void>;
}

export interface ShowModalOptions {
  node: VNode;
  transition?: Transition;
}
