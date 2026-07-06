const state = {

    currentUser: null,

    users: [],

    selectedRanking: "general"

};

export function getState() {
    return state;
}

export function setCurrentUser(user) {
    state.currentUser = user;
}

export function setUsers(users) {
    state.users = users;
}

export function setSelectedRanking(ranking) {
    state.selectedRanking = ranking;
}

export function getSelectedRanking() {
  return state.selectedRanking;
}