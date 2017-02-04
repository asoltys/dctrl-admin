import _ from 'lodash'

const state = {
  claimId: false,
  reserveId: false,
  claimForm: {
    alias:'',
    address:''
  },
  reserveForm: {
    alias:'',
    address:''
  },
  active: [{
    _id: '1',
    name: 'Good Meetup',
    amount: 15000,
    description: 'Host an awesome meetup that brings a whole bunch of new faces into the space and teaches them about technology, decentralization, justice, etc...',
    tags: ['meetup', 'propaganda', 'people', 'intelligence'],
    monthlyBudget: 50000,
    claimed: false,
    claimedBy:'',
  },{
    _id: '2',
    name: 'Garbage',
    amount: 1000,
    description: 'Bundle all known bins both small and large, then take them out the dangerous back hallway and into the rubbish bin in the alley.',
    tags: ['strength', 'courage', 'intelligence'],
    monthlyBudget: 50000,
    claimed: false,
    claimedBy:'',
  }],
}

const mutations = {
    setClaimAddress(bounties, address){
        bounties.claimAddress = address
    },
    setClaimId(bounties, _id){
        console.log(_id)
        bounties.claimId = _id
    },
    setReserveId(_id){
        bounties.reserveId = _id
    },
    setClaimAlias(alias){
        bounties.claimAlias = alias
    },
    claimBounty(bounties, info){
        bounties.active.forEach( bounty => {
            if (bounty._id === bounties.claimId){
                bounty.claimed = true
                bounty.claimedBy += info.alias
            }
        })
    },
    addBounty(bounties, bounty){
        bounties.active.push(bounty)
    }
}

// Actions are for the async calls to the server
const actions = {
    ADD_BOUNTY(){
        // TODO post req then mutate
    },
    CLAIM_BOUNTY({commit}, info){
        commit('claimBounty', info)
        // TODO post req then mutate
    }
}

export default {
  state,
  mutations,
  actions,
}
