import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Card dimensions
export const CARD_WIDTH = width - 40;
export const CARD_HEIGHT = height * 0.7;

// Button dimensions
export const BUTTON_HEIGHT = 50;
export const BUTTON_HEIGHT_SMALL = 40;
export const BUTTON_HEIGHT_LARGE = 60;

// Input dimensions
export const INPUT_HEIGHT = 50;
export const INPUT_BORDER_RADIUS = 25;

// Icon sizes
export const ICON_SIZE_SMALL = 16;
export const ICON_SIZE_MEDIUM = 24;
export const ICON_SIZE_LARGE = 32;
export const ICON_SIZE_XLARGE = 40;

// Spacing
export const SPACING_XS = 4;
export const SPACING_SM = 8;
export const SPACING_MD = 16;
export const SPACING_LG = 24;
export const SPACING_XL = 32;

// Border radius
export const BORDER_RADIUS_SM = 8;
export const BORDER_RADIUS_MD = 12;
export const BORDER_RADIUS_LG = 20;
export const BORDER_RADIUS_XL = 25;

// Font sizes
export const FONT_SIZE_XS = 12;
export const FONT_SIZE_SM = 14;
export const FONT_SIZE_MD = 16;
export const FONT_SIZE_LG = 18;
export const FONT_SIZE_XL = 24;
export const FONT_SIZE_XXL = 32;

// Header height
export const HEADER_HEIGHT = 60;
export const TAB_BAR_HEIGHT = 60;
