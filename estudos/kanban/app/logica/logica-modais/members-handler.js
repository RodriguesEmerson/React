import { modalInfos } from "./main";

const membersHandler = {
   handleAddMember: function (newMember, outMembers, setOutMembers) {
      const cardMembers = modalInfos.getCardInfos().integrants;
      this.setIntegrants([...cardMembers, newMember]);
      setOutMembers([...outMembers].filter(member => member.nome != newMember.nome));
   },

   handleRemoveMember: function (removedMember, outMembers, setOutMembers) {
      const cardMembers = modalInfos.getCardInfos().integrants;
      //Remove o membro clicado e envia o array já filtrado para a função.
      this.setIntegrants([...cardMembers].filter(member => member.nome != removedMember.nome));
      //Para o modal não dar uma 'piscada' ao alterar os membros.
      setOutMembers([...outMembers, removedMember]);
   },

   updateOutMembers: function (projectIntegrants) {
      const cardMembers = modalInfos.getCardInfos().integrants;
      //retorna se não haver nenhum integrante no card.
      if (cardMembers.length === 0) return projectIntegrants;

      //Cria um objeto contendo todos os nomes dos integrantes do projeto.
      const cardMembersNames = new Set(cardMembers.map(member => member.nome));

      //Filtra os integrantes do projeto que não estão no card.
      const filteredOutMembers = projectIntegrants.filter(member => !cardMembersNames.has(member.nome));
      return(filteredOutMembers);
   },

   setIntegrants: function (members) {
      const cardInfos = modalInfos.getCardInfos();
      modalInfos.setCardInfos({
         ...cardInfos,
         integrants: members
      });
      cardInfos.integrants = members;
   },

}

export { membersHandler }