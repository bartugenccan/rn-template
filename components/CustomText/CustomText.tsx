import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/constants/Typography';
interface CustomTextProps extends TextProps {
  i18nKey?: string;
  values?: object;
  fontFamily?: keyof typeof Typography.fontFamily;
}

export const CustomText: React.FC<CustomTextProps> = ({
  i18nKey,
  values,
  fontFamily,
  children,
  ...props
}) => {
  const { t } = useTranslation();

  const content = i18nKey ? t(i18nKey, values as Record<string, unknown>) : children;

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: fontFamily
            ? Typography.fontFamily[fontFamily]
            : Typography.fontFamily.regular,
        },
        props.style,
      ]}
      allowFontScaling={false}>
      {content}
    </Text>
  );
};
