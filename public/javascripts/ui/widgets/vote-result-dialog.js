(function () {
    function VoteResultDialog(storyName, voteStatus) {
        TeamPoker.UI.WidgetBase.call(this);

        var voteResultDialog = null;
        this.init = function() {
            var header = [$("<h3>").text("Story point for: "), $("<span>").text(storyName)],
                body = $("<div>").attr("id", "voteResultPanel"),
                txtStoryPoint = $("<input>").attr("type", "text").attr("class", "input-mini").attr("id", "txt-estimated-story-point").attr("size", "2").attr("autofocus", ""),
                spErr = $("<span>").attr("class", "hide ipt-err").text("Invalid story point!"),
                estimationWrapper = $("<div>").attr("id", "estimated-story-point-wrapper").append($("<span>").text("Estimated Point: ")).append(txtStoryPoint).append(spErr), 
                revoteBtn = $("<a>").attr("href", "javascript:void(0);").attr("class", "btn").attr("data-dismiss", "modal").text("Re-vote"),
                savePointBtn = $("<a>").attr("href", "javascript:void(0);").attr("class", "btn btn-primary").attr("data-dismiss", "modal").text("Save Point To Story"),
                footer = [estimationWrapper, revoteBtn, savePointBtn],
                me = this;

            voteResultDialog = new TeamPoker.UI.PopUp('vote-result-dialog', header, body, footer);
            voteResultDialog.init();
            voteResultDialog.onShown.push(function() {
                var animateVotedPoker = function (poker) {
                    poker.css('opacity', 1);
                    poker.css('webkitTransform', 'rotateY(360deg)');
                    poker.css('-moz-Transform', 'rotateY(360deg)');
                }

                var animationQueue = [];
                _(voteStatus).each(function(voteInfo) {
                    var voterName = voteInfo["VoterName"], voteVal = voteInfo["VoteVal"];
                    var $votedPoker = $('<div class="votedPoker resultPoker"><div class="poker">' + voteVal + '</div><span>' + voterName + '</span></div>');

                    $votedPoker.bind('transitionend webkitTransitionEnd', function () {
                        if(voteInfo.HighScore) {
                            $(this).addClass('highscore');
                            $(this).css('margin-top', '10px');
                        }
                        if(voteInfo.LowScore) {
                            $(this).addClass('lowscore');
                            $(this).css('margin-top', '30px');
                        }
                        if(voteInfo.SpecialScore) {
                            $(this).addClass('specialscore');
                        }
                    });

                    body.append($votedPoker);
                    animationQueue.push($votedPoker);
                });

                _(animationQueue).each(function (poker) {
                    setTimeout(function () { animateVotedPoker(poker); }, 100);
                });
            });

            txtStoryPoint.on("keyup", function() {
                if($.inArray($(this).val(), TeamPoker.Constants.POKER_VALUES) === -1)
                    spErr.show();
                else
                    spErr.hide();
            });
            revoteBtn.click(function(e){
                me.broadcastMessage("RE-VOTE");
            });
            savePointBtn.click(function(e){
                var storyPoint = txtStoryPoint.val();
                if($.inArray(storyPoint, TeamPoker.Constants.POKER_VALUES) >= 0)
                    me.broadcastMessage("SAVE-POINT", storyPoint);
                else
                    spErr.show();
            });
        };

        this.show = function() {
            voteResultDialog.show(); 
        };

        this.hide = function() {
            voteResultDialog.hide(); 
        };


      /*
       *<div id="voteResultWrapper" class="modal hide fade">
       *  <div class="modal-header">
       *    <h3>Story point for:</h3>
       *    <span id="sp-story-be-voted">dummy story</span>
       *  </div>
       *  <div class="modal-body">
       *    <div id="voteResultPanel"></div>
       *  </div>
       *  <div class="modal-footer">
       *    <div id="estimated-story-point-wrapper">
       *      <span>Estimated Point: </span>
       *      <input class="input-mini" id="txt-estimated-story-point" size="2" type="text" autofocus>
       *    </div>
       *    <a href="#" id="btnRevote" class="btn" data-dismiss="modal">Re-vote</a>
       *    <a href="#" id="btnSavePoint" class="btn btn-primary" data-dismiss="modal">Save Point To Story</a>
       *  </div>
       *</div>
       */

    }

    VoteResultDialog.prototype = Object.create(TeamPoker.UI.WidgetBase.prototype);
    TeamPoker.UI.VoteResultDialog = VoteResultDialog;
})();
