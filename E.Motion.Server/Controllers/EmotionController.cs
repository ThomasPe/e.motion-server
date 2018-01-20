using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using E.Motion.Server.Hubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace E.Motion.Server.Controllers
{
    [Produces("application/json")]
    [Route("api/Emotion")]
    public class EmotionController : Controller
    {
        private IHubContext<UpdaterHub> _updaterHubContext;

        public EmotionController(IHubContext<UpdaterHub> updaterHubContext)
        {
            _updaterHubContext = updaterHubContext;
        }

        [Route("start")]
        [HttpPost]
        public async Task<ActionResult> Start()
        {
            Debug.WriteLine("starting");
            await _updaterHubContext.Clients.All.InvokeAsync("Start");
            return new OkResult();
        }

        [Route("reset")]
        [HttpPost]
        public async Task<ActionResult> Reset()
        {
            Debug.WriteLine("reset");
            await _updaterHubContext.Clients.All.InvokeAsync("Reset");
            return new OkResult();
        }

        // POST: api/Emotion
        /// <summary>
        /// Update the emotion of the player
        /// </summary>
        /// <param name="emotion"></param>
        [HttpPost("{emotion}")]
        public async Task<ActionResult> PostEmotion([FromRoute]string emotion)
        {
            Debug.WriteLine(emotion);
            await _updaterHubContext.Clients.All.InvokeAsync("Emotion", emotion);
            return new OkResult();
        }
        
    }
}
