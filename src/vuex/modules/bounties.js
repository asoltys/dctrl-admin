import _ from 'lodash'
import request from 'superagent'

const state = {
  claimId: false,
  claimaddress: false,
  claimNotes: false,
  list: [],
}

const mutations = {
    setClaimId(bounties, _id){
      bounties.claimId = _id
    },
    setClaimAddress(bounties, address){
        bounties.claimAddress = address
    },
    setClaimNotes(bounties, notes){
        bounties.claimNotes = notes
    },
    addBounty(bounties, bounty){
        bounties.list.push(bounty)
    },
    claimBounty(bounties){
        bounties.list.forEach(bounty => {
            if (bounty._id == bounties.claimId){
                console.log('claiming bounty')
                bounty.isClaimed = true
                bounty.claimAddress = bounties.claimAddress
                bounty.claimNotes = bounties.claimNotes
            }
        })
    }
}

// Actions are for the async calls to the server
const location = 'http://192.168.0.127:3000/'

const actions = {
    GET_ACTIVE_BOUNTIES({commit, state}){
        commit('addBounty', {
          _id: "asd",
          amount: 5100,
          name: "Get 3D printer working.",
          description: "For details refer to the github issue. Yada yada Lorem ipsum lorum decorum.",
          isClaimed: false
        })
        commit('addBounty', {
          _id: "asda",
          amount: 100,
          name: "Install lock on backroom door.",
          description: "test1 or details refer to the github issue. Yada yada Lorem ipsum lorum decorum. or details refer to the github issue. Yada yada Lorem ipsum lorum decorum. or details refer to the github issue. Yada yada Lorem ipsum lorum decorum.",
          isClaimed: false
        })
    },
    CLAIM_BOUNTY({commit, state}){
        let claimPost = {
            notes: state.claimNotes,
            address: state.claimAddress,
            bountyId: state.claimId
        }
        request
            .post(location + 'claimbounty')
            .send(claimPost)
            .then(res => {
                console.log(res.body)
                commit('claimBounty')
            })
    }
}

export default {
  state,
  mutations,
  actions,
}
