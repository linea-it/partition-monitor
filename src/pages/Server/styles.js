import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  centralizarIcon: {
    textAlignLast: 'center',
  },
  link: {
    cursor: 'pointer',
    color: 'blue',
  },
  spacingDiv: {
    borderStyle: 'groove',
    borderBottomWidth: '2px',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  gridHeight: {
    height: '100%',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  }
});

export default styles;