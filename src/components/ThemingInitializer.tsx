import { 
  useTheming,  
  usePreferences,
  useAppDispatch, 
  useAppSelector,
  setBreakpoint, 
  setColorScheme, 
  setContrast, 
  setForcedColors, 
  setMonochrome, 
  setReducedMotion, 
  setReducedTransparency
} from "@edrlab/thorium-web/epub";
import { propsToCSSVars } from "@edrlab/thorium-web/core/helpers";
import { ThThemeKeys } from "@edrlab/thorium-web/core/preferences";

export default function ThemingInitializer() {
  const RSPrefs = usePreferences();
  const theme = useAppSelector(state => state.theming.theme);

  const dispatch = useAppDispatch();

  // Init theming (breakpoints, theme, media queries…)
  useTheming<ThThemeKeys>({
    theme,
    themeKeys: RSPrefs.theming.themes.keys,
    systemKeys: {
      light: ThThemeKeys.light,
      dark: ThThemeKeys.dark,
    },
    breakpointsMap: RSPrefs.theming.breakpoints,
    initProps: {
      ...propsToCSSVars(RSPrefs.theming.arrow, "arrow"),
      ...propsToCSSVars(RSPrefs.theming.icon, "icon"),
      ...propsToCSSVars(RSPrefs.theming.layout, "layout"),
    },
    onBreakpointChange: (breakpoint) => dispatch(setBreakpoint(breakpoint)),
    onColorSchemeChange: (colorScheme) => dispatch(setColorScheme(colorScheme)),
    onContrastChange: (contrast) => dispatch(setContrast(contrast)),
    onForcedColorsChange: (forcedColors) => dispatch(setForcedColors(forcedColors)),
    onMonochromeChange: (isMonochrome) => dispatch(setMonochrome(isMonochrome)),
    onReducedMotionChange: (reducedMotion) => dispatch(setReducedMotion(reducedMotion)),
    onReducedTransparencyChange: (reducedTransparency) => dispatch(setReducedTransparency(reducedTransparency))
  });

  return null;
}
