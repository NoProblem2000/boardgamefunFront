import {NgxUiLoaderConfig, PB_DIRECTION, POSITION, SPINNER} from "ngx-ui-loader";
import {NotifierOptions} from "angular-notifier";

export const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsSize: 60,
  pbColor: '#569bb2',
  overlayColor: '#797979',
  fgsPosition: POSITION.centerCenter,
  fgsType: SPINNER.squareJellyBox,
  pbThickness: 5
};

export const notifierOptions: NotifierOptions  = {
  position: {
    horizontal: {
      position: 'middle',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 10,
      gap: 5
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 4000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 3
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
