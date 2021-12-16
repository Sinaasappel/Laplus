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

    contentSplit(c) {
        return c.split(' ');
    }

    vcCheck(m) {
        const vc = m.member?.voice?.channel;
        const vcme = m.guild?.me?.voice?.channel;
        if(!vc) {
            m.channel.send(this.lang.vc.perm.notjoinvc);
            return false;
        }
        if(vcme && vc != vcme.id) {
            m.channel.send(this.lang.vc.perm.notsamevcbot);
            return false;
        }
        if(!vc.joinable) {
            m.channel.send(this.lang.vc.perm.vcnotjoinable);
            return false;
        }
        if(!vc.speakable) {
            m.channel.send(this.lang.vc.perm.vcnotspeakable);
            return false;
        }
        return true;
    }

    argCheck(m, ms) {
        if(!ms) {
            m.channel.send(this.lang.etc.arg.empty);
            return false;
        }
        return true;
    }
}

module.exports = bUtils;