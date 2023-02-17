import React from 'react'
import PropTypes from 'prop-types'
import BubbleError from '../../assets/img/icons/bubble_error.svg'
import BubbleSuccess from '../../assets/img/icons/bubble_success.svg'
import BubbleInfos from '../../assets/img/icons/bubble_infos.svg'
import BubbleWarning from '../../assets/img/icons/bubble_warning.svg'
import { FaTimes } from 'react-icons/fa'

const AlertData = (state) => {
  switch (state) {
    case 'error':
      return {
        icon: BubbleError
      }
    case 'success':
      return {
        icon: BubbleSuccess
      }
    case 'infos':
      return {
        icon: BubbleInfos
      }
    case 'warning':
      return {
        icon: BubbleWarning
      }
    default:
      return {
        icon: BubbleInfos
      }
  }
}

export default class Alert extends React.Component {
  static get propTypes() {
    return {
      calltext: PropTypes.string,
      callfunction: PropTypes.func,
      closable: PropTypes.bool,
      state: PropTypes.any,
      className: PropTypes.string,
      message: PropTypes.string,
      actions: PropTypes.object
    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={`alert ${this.props.state} ${this.props.className}`}>
        <div className="flex justify-between align-center w-full">
          <div className="flex justify-between align-center w-full">
            <div className="flex gap-[24px]">
              <img src={AlertData(this.props.state).icon} alt={`bubble_${this.props.state}`} />
              <span>{this.props.message}</span>
            </div>
            {this.props.closable !== undefined && 
              (
                <span className="close" onClick={() => {  }}><FaTimes /></span>
              )
            }
          </div>
          {this.props.callfunc !== undefined &&
            <div className="actions">
              <button className="btn" onClick={ this.props.callfunc }>{ this.props.calltext }</button>
            </div>
          }
        </div>
      </div>
    )
  }
}