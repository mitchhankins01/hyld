import red from '@material-ui/core/colors/red'
import pink from '@material-ui/core/colors/pink'
import green from '@material-ui/core/colors/indigo'
import blueGrey from '@material-ui/core/colors/blueGrey'
import amber from '@material-ui/core/colors/amber'
import orange from '@material-ui/core/colors/orange'
import blue from '@material-ui/core/colors/blue'

const themes = [
  {
    id: 'default',
    color: blueGrey[500],
    source: {
      palette: {
        primary: blueGrey,
        secondary: red,
        error: red,
      },
    },
  },
  {
    id: 'amber',
    color: amber[500],
    source: {
      palette: {
        primary: amber,
        secondary: pink,
        error: red,
      },
    },
  },
  {
    id: 'orange',
    color: orange[500],
    source: {
      palette: {
        primary: orange,
        secondary: pink,
        error: red,
      },
    },
  },
]

export default themes
