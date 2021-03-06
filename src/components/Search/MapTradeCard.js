import { Paper, Card, CardMedia, Typography, Button, SvgIcon, IconButton, Icon } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import Tag from '../Tag'
import { makeStyles } from '@material-ui/styles'
import barterIcon from '../../assets/noun_Work for Food_97466.svg'
import { TradeIcon } from '../TradeIcon'
import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useHistory } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomSection: {
    display: 'flex',
    direction: 'row',
    '& > *': {
      marginLeft:15
    },
    width: '100%',
    justifyContent: 'space-between'
  },
  buttons: {
    display: 'flex',
    direction: 'row',
    '& > .MuiButton-root': {
      marginLeft:15
    },
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 5,
    maxWidth: 350
  },
  cardTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
}))

// line 57 will be user's opposite tags, but didn't do logic yet, so now you just have 2 sets of the same tags - says seeking now, will be logic for seeking/offering

const MapTradeCard = inject('GeneralStore', 'SearchStore', 'UserStore')(observer((props) =>  {

  const { GeneralStore, SearchStore, UserStore, trade, showMap, userId } = props

  const [seeTags, setSeeTags] = useState(false)

  const classes = useStyles()

  const history = useHistory()

  const redirectToProfile = () => {
    history.push(`/profile/${trade.user_id._id}`)
  }

  const startTrade = () => {
    GeneralStore.setStartTradeUserId(trade.user_id._id)
    GeneralStore.setStartTrade(trade)
    GeneralStore.setStartTradeDialog(true)
  }



  return (
    <Paper style={{marginBottom: 15, padding: 15}}>
      <div className={classes.card}>
        <Card style={{width:125, flexShrink: 0, height: 125}}>
          <CardMedia style={{height: 125}}
            image={trade.thumbnail.imageUrl}
            title="Trade Thumbnail"
          />
        </Card>
        <div className={classes.text}>
        
          <Typography variant="body1">{trade.title}</Typography>
          {trade.user_id.location && trade.user_id.location.city && <Typography variant="subtitle1" style={{fontSize: 12}} color="textSecondary">{`${trade.user_id.location.city}, ${trade.user_id.location.country}`}</Typography>}
          <Typography variant="subtitle1" style={{fontSize: 12}} paragraph={true} color="textSecondary">{trade.subTitle}</Typography>
          <Typography variant="body1" style={{fontSize: 14}}  paragraph={true}>{trade.description}</Typography>
        </div>
        <div>
          {seeTags ? trade.tags.map(tag => <Tag tag={tag} />) : [...trade.tags].splice(0, 3).map(tag => <Tag tag={tag} />)}
          {!seeTags ? <IconButton size="small" onClick={() => setSeeTags(!seeTags)}><ExpandMoreIcon /></IconButton> : <IconButton size="small" onClick={() => setSeeTags(!seeTags)}><ExpandLessIcon /></IconButton>}
        </div>
      </div>
      <div className={classes.bottomSection}>
      <Typography style={{alignSelf: 'flex-end'}} variant="subtitle2">{trade.type === "Offering" ? "Offering" : "Requesting"}{UserStore.isNeighbor(trade.user_id._id) && ` - Neighbor`}</Typography>
        <div className={classes.buttons}>
          <Button startIcon={<PersonIcon />} onClick={redirectToProfile} color="secondary" variant="contained">More</Button>
          <Button startIcon={<TradeIcon />} onClick={startTrade} color="secondary" variant="contained">Trade!</Button>
        </div>
    
      </div>
    </Paper>
  )
}))

export default MapTradeCard