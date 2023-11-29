import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import { ListItemProps } from "@mui/material";
import PropTypes from 'prop-types'

const Directions = ['horizontal', 'vertical'] as const;
type Direction = typeof Directions[number];

interface PropertyListItemProps extends ListItemProps {
  align?: Direction;
  label: string;
  value?: string | number;
}

export const PropertyListItem = ({align = 'vertical', label, value, disableGutters, children, ...other}: PropertyListItemProps) => {
  return (
    <ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5
      }}
      {...other}
    >
      <ListItemText
        disableTypography
        sx={{
          display: 'flex',
          flexDirection: align === 'vertical' ? 'column' : 'row',
          my: 0
        }}
        primary={(
          <Typography
            variant='subtitle2'
            sx={{minWidth: align === 'vertical' ? 'inherit' : 200}}
          >
            {label}
          </Typography>
        )}
        secondary={(
          <Box sx={{flex: 1, mt: align === 'vertical' ? 0.5 : 0}}>
            {children || (
              <Typography color='textSecondary' variant='body2'>
                {value}
              </Typography>
            )}
          </Box>
        )}
      />
    </ListItem>
  )
}

PropertyListItem.propTypes = {
  align: PropTypes.oneOf<Direction>(Directions),
  children: PropTypes.node,
  disableGutters: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
