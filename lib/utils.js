class bUtils {
    /**
     * @access private
     */
    lang;

    /**
     * @param langfile;
     */
    constructor(langfile) {
        this.lang = langfile;
    }

    vcCheck(i) {
        const vc = i.member?.voice?.channel;
        const vcme = i.guild?.me?.voice?.channel;
        if(!vc) {
            i.editReply(this.lang.vc.perm.notjoinvc);
            return false;
        }
        if(vcme && vc != vcme.id) {
            i.editReply(this.lang.vc.perm.notsamevcbot);
            return false;
        }
        if(!vc.joinable) {
            i.editReply(this.lang.vc.perm.vcnotjoinable);
            return false;
        }
        if(!vc.speakable) {
            i.editReply(this.lang.vc.perm.vcnotspeakable);
            return false;
        }
        return true;
    }
}

module.exports = bUtils;