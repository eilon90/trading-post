import { Paper, Card, CardMedia, Typography, Button, SvgIcon, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import Tag from '../Tag'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'
import barterIcon from '../../assets/noun_Work for Food_97466.svg'
import { TradeIcon } from '../TradeIcon'
import EditIcon from '@material-ui/icons/Edit';
import AddTradeCard from '../Profile/Edits/AddTradeCard'
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
  cardTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  card:{
    '& .MuiIconButton-root': {
      display: 'none',
      fontSize: 20
    },
    '&:hover': {
      '& .MuiIconButton-root': {
        display: 'inline-block'
      },
    },
  },
  editIcon: {
    fontSize: 18
  }
}))


const ProfileTradeCard = inject('SearchStore')(observer((props) =>  {

  const { SearchStore, trade, editable } = props

  const classes = useStyles()

  return (
    <Paper>
      <div className={`${classes.card} profile-trade-card`} >
        <Card style={{width:125}}>
          <CardMedia style={{height: 125}}
            image={trade.thumbnail.imageUrl}
            title="Trade Thumbnail"
          />
        </Card>
        <div className="middle-section">
          <div className={classes.cardTitle}>
            <Typography variant="body1">{trade.title}</Typography>
            {editable && <IconButton size="small" ><EditIcon className={classes.editIcon} /></IconButton>}
          </div>
          <Typography variant="subtitle1" style={{fontSize: 12}} paragraph={true} color="textSecondary">{trade.subTitle}</Typography>
          <Typography variant="body1" style={{fontSize: 14}}  paragraph={true}>{trade.description}</Typography>
          <div className="trade-card-tags">
            {trade.tags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
        </div>
        {trade.type === "Offering" ? <Button startIcon={<TradeIcon />} color="secondary" variant="contained">Trade!</Button> : <Button startIcon={<TradeIcon />} color="secondary" variant="contained">Trade!</Button>}
      </div>
    </Paper>
  )
}))

export default ProfileTradeCard