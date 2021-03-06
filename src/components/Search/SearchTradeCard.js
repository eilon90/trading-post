import { Paper, Card, CardMedia, Typography, Button, SvgIcon, IconButton, Icon, CardContent, CardActions } from '@material-ui/core'
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
    maxWidth: 300,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
  }
}))


// line 57 will be user's opposite tags, but didn't do logic yet, so now you just have 2 sets of the same tags - says seeking now, will be logic for seeking/offering

const SearchTradeCard = inject('GeneralStore', 'SearchStore', 'UserStore')(observer((props) => {

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
    
    <Card className={classes.card}>
      <CardMedia
        style={{ height: 150 }}
        image={trade.thumbnail.imageUrl}
      />
      <CardContent>
        <Typography variant="subtitle1" style={{ fontSize: 12 }} paragraph={true} color="textSecondary">{trade.type === "Offering" ? "Offering" : "Requesting"}{UserStore.isNeighbor(trade.user_id._id) && ` - Neighbor`}</Typography>
        <Typography variant="body1">{trade.title}</Typography>
        {trade.user_id.location && trade.user_id.location.city &&  <Typography variant="subtitle1" style={{ fontSize: 12 }} color="textSecondary">{`${trade.user_id.location.city}, ${trade.user_id.location.country}`}</Typography>}
        <Typography variant="subtitle1" style={{ fontSize: 12 }} paragraph={true} color="textSecondary">{trade.subTitle}</Typography>
        <Typography variant="body1" style={{ fontSize: 14 }} paragraph={true}>{trade.description}</Typography>
        {seeTags ? trade.tags.map(tag => <Tag tag={tag} />) : [...trade.tags].splice(0, 3).map(tag => <Tag tag={tag} />)}
        {!seeTags ? <IconButton size="small" onClick={() => setSeeTags(!seeTags)}><ExpandMoreIcon /></IconButton> : <IconButton size="small" onClick={() => setSeeTags(!seeTags)}><ExpandLessIcon /></IconButton>}
      </CardContent>
      <CardActions style={{marginTop: 'auto', alignSelf: 'center', }}>
        <Button style={{marginRight: 10}} startIcon={<PersonIcon />} onClick={redirectToProfile} color="secondary" variant="contained">More</Button>
        <Button startIcon={<TradeIcon />} onClick={startTrade} color="secondary" variant="contained">Trade!</Button>
      </CardActions>
        </Card>
    
  )
}))

export default SearchTradeCard